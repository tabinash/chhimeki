"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Volume1,
    Maximize,
    Minimize,
    Settings,
    RotateCcw,
    Loader2,
    Check
} from "lucide-react";
import Hls from "hls.js";

interface PostVideoProps {
    videoUrl: string;
    videoThumbnail?: string | null;
    videoDuration?: number | null;
}

interface QualityLevel {
    height: number;
    bitrate: number;
    index: number;
}

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function PostVideo({ videoUrl, videoThumbnail, videoDuration }: PostVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const doubleTapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    // Video state
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(videoDuration || 0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // UI state
    const [showControls, setShowControls] = useState(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settingsTab, setSettingsTab] = useState<'main' | 'quality' | 'speed'>('main');

    // HLS state
    const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
    const [currentQuality, setCurrentQuality] = useState(-1); // -1 = auto
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    // Double-tap state
    const [doubleTapSide, setDoubleTapSide] = useState<'left' | 'right' | null>(null);
    const [tapCount, setTapCount] = useState(0);
    const [seekAmount, setSeekAmount] = useState(0);

    // Initialize HLS
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoUrl) return;

        const isHLS = videoUrl.includes('.m3u8');

        if (isHLS && Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
                setIsLoading(false);
                // Get quality levels
                const levels = data.levels.map((level, index) => ({
                    height: level.height,
                    bitrate: level.bitrate,
                    index
                }));
                setQualityLevels(levels);
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                if (currentQuality === -1) {
                    // Auto mode - just track current level
                }
            });

            hls.on(Hls.Events.ERROR, (_, data) => {
                if (data.fatal) {
                    console.error('HLS fatal error:', data);
                    setIsLoading(false);
                }
            });

            hlsRef.current = hls;

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoUrl;
            setIsLoading(false);
        } else {
            video.src = videoUrl;
            setIsLoading(false);
        }
    }, [videoUrl]);

    // Auto-pause when video leaves viewport
    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        if (!container || !video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!entry.isIntersecting) {
                    // Video left viewport - pause and reset
                    if (!video.paused) {
                        video.pause();
                        setIsPlaying(false);
                    }
                    // Optionally reset to beginning
                    video.currentTime = 0;
                    setProgress(0);
                    setCurrentTime(0);
                    setShowControls(true);
                }
            },
            {
                root: null,
                rootMargin: '-50px', // Trigger slightly before fully leaving
                threshold: 0,
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Video event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const handleProgress = () => {
            if (video.buffered.length > 0 && video.duration) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                setBuffered((bufferedEnd / video.duration) * 100);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoading(false);
        };

        const handleWaiting = () => setIsLoading(true);
        const handleCanPlay = () => setIsLoading(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('progress', handleProgress);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('progress', handleProgress);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Auto-hide controls
    const resetControlsTimeout = useCallback(() => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        setShowControls(true);
        if (isPlaying) {
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
                setShowSettings(false);
                setShowVolumeSlider(false);
            }, 3000);
        }
    }, [isPlaying]);

    // Toggle play/pause
    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        resetControlsTimeout();
    }, [isPlaying, resetControlsTimeout]);



    // Seek video
    const seekTo = useCallback((time: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(time, video.duration));
    }, []);

    // Handle progress bar click
    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const progressBar = progressRef.current;
        if (!video || !progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        seekTo(clickPosition * video.duration);
    }, [seekTo]);

    // Toggle fullscreen
    const toggleFullscreen = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    }, []);

    // Change quality
    const changeQuality = useCallback((levelIndex: number) => {
        const hls = hlsRef.current;
        if (!hls) return;

        if (levelIndex === -1) {
            hls.currentLevel = -1; // Auto
        } else {
            hls.currentLevel = levelIndex;
        }
        setCurrentQuality(levelIndex);
        setSettingsTab('main');
    }, []);

    // Change playback speed
    const changeSpeed = useCallback((speed: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = speed;
        setPlaybackSpeed(speed);
        setSettingsTab('main');
    }, []);

    // Double-tap to seek
    const handleDoubleTap = useCallback((side: 'left' | 'right') => {
        const video = videoRef.current;
        if (!video) return;

        const seekSeconds = 10;
        const newTime = side === 'left'
            ? video.currentTime - seekSeconds
            : video.currentTime + seekSeconds;

        seekTo(newTime);

        setDoubleTapSide(side);
        setTapCount(prev => prev + 1);
        setSeekAmount(prev => prev + seekSeconds);

        if (doubleTapTimeoutRef.current) {
            clearTimeout(doubleTapTimeoutRef.current);
        }

        doubleTapTimeoutRef.current = setTimeout(() => {
            setDoubleTapSide(null);
            setTapCount(0);
            setSeekAmount(0);
        }, 800);
    }, [seekTo]);

    // Handle video area click/tap
    const lastTapRef = useRef<{ time: number; x: number } | null>(null);

    const handleVideoClick = useCallback((e: React.MouseEvent) => {
        const now = Date.now();
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const isLeftSide = clickX < rect.width / 2;

        // Check for double-tap
        if (lastTapRef.current && now - lastTapRef.current.time < 300) {
            // Double-tap detected
            handleDoubleTap(isLeftSide ? 'left' : 'right');
            lastTapRef.current = null;
        } else {
            // Single tap - toggle play/pause after short delay
            lastTapRef.current = { time: now, x: clickX };
            setTimeout(() => {
                if (lastTapRef.current && Date.now() - lastTapRef.current.time >= 300) {
                    togglePlay();
                    lastTapRef.current = null;
                }
            }, 300);
        }

        resetControlsTimeout();
    }, [handleDoubleTap, togglePlay, resetControlsTimeout]);

    // Format time
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Get quality label
    const getQualityLabel = (height: number) => {
        if (height >= 2160) return '4K';
        if (height >= 1440) return '1440p';
        if (height >= 1080) return '1080p';
        if (height >= 720) return '720p';
        if (height >= 480) return '480p';
        if (height >= 360) return '360p';
        return `${height}p`;
    };

    // Get volume icon

    return (
        <div
            ref={containerRef}
            className={`relative bg-black group ${isFullscreen ? 'w-screen h-screen' : 'aspect-[16/9]'}`}
            onMouseMove={resetControlsTimeout}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={videoThumbnail || undefined}
                muted={false}
                playsInline
                onClick={handleVideoClick}
            />

            {/* Loading Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
            )}

            {/* Double-tap Seek Indicator */}
            {doubleTapSide && (
                <div
                    className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 text-white animate-pulse ${doubleTapSide === 'left' ? 'left-8' : 'right-8'
                        }`}
                >
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <RotateCcw className={`w-6 h-6 ${doubleTapSide === 'right' ? 'scale-x-[-1]' : ''}`} />
                    </div>
                    <span className="text-sm font-bold">{seekAmount} seconds</span>
                </div>
            )}

            {/* Center Play Button (when paused) */}
            {!isPlaying && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white/90 hover:bg-white hover:scale-105 rounded-full flex items-center justify-center shadow-lg transition-all"
                    >
                        <Play className="w-7 h-7 text-gray-900 ml-1" fill="currentColor" />
                    </button>
                </div>
            )}

            {/* Controls Overlay */}
            <div
                className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Gradient Background */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                {/* Bottom Controls */}
                <div className="relative z-10 px-3 pb-3">
                    {/* Progress Bar */}
                    <div
                        ref={progressRef}
                        className="h-1 bg-white/30 rounded-full mb-3 cursor-pointer group/progress"
                        onClick={handleProgressClick}
                    >
                        {/* Buffer */}
                        <div
                            className="absolute h-1 bg-white/50 rounded-full"
                            style={{ width: `${buffered}%` }}
                        />
                        {/* Progress */}
                        <div
                            className="absolute h-1 bg-red-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                        {/* Scrubber */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity"
                            style={{ left: `calc(${progress}% - 6px)` }}
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between gap-2">
                        {/* Left Controls */}
                        <div className="flex items-center gap-2">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5" fill="currentColor" />
                                ) : (
                                    <Play className="w-5 h-5" fill="currentColor" />
                                )}
                            </button>



                            {/* Time Display */}
                            <span className="text-white text-xs font-medium ml-1">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-1">
                            {/* Settings */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className={`w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-all ${showSettings ? 'rotate-45' : ''
                                        }`}
                                >
                                    <Settings className="w-5 h-5" />
                                </button>

                                {/* Settings Menu */}
                                {showSettings && (
                                    <div className="absolute bottom-10 right-0 w-52 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
                                        {settingsTab === 'main' && (
                                            <>
                                                <button
                                                    onClick={() => setSettingsTab('quality')}
                                                    className="w-full px-4 py-3 flex items-center justify-between text-white text-sm hover:bg-white/10 transition-colors"
                                                >
                                                    <span>Quality</span>
                                                    <span className="text-white/60">
                                                        {currentQuality === -1 ? 'Auto' : getQualityLabel(qualityLevels[currentQuality]?.height || 0)}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => setSettingsTab('speed')}
                                                    className="w-full px-4 py-3 flex items-center justify-between text-white text-sm hover:bg-white/10 transition-colors"
                                                >
                                                    <span>Playback speed</span>
                                                    <span className="text-white/60">{playbackSpeed}x</span>
                                                </button>
                                            </>
                                        )}

                                        {settingsTab === 'quality' && (
                                            <>
                                                <button
                                                    onClick={() => setSettingsTab('main')}
                                                    className="w-full px-4 py-2 flex items-center gap-2 text-white text-sm border-b border-white/10"
                                                >
                                                    <span className="text-white/60">←</span>
                                                    <span className="font-medium">Quality</span>
                                                </button>
                                                <button
                                                    onClick={() => changeQuality(-1)}
                                                    className="w-full px-4 py-2.5 flex items-center justify-between text-white text-sm hover:bg-white/10"
                                                >
                                                    <span>Auto</span>
                                                    {currentQuality === -1 && <Check className="w-4 h-4" />}
                                                </button>
                                                {qualityLevels.sort((a, b) => b.height - a.height).map((level) => (
                                                    <button
                                                        key={level.index}
                                                        onClick={() => changeQuality(level.index)}
                                                        className="w-full px-4 py-2.5 flex items-center justify-between text-white text-sm hover:bg-white/10"
                                                    >
                                                        <span>{getQualityLabel(level.height)}</span>
                                                        {currentQuality === level.index && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </>
                                        )}

                                        {settingsTab === 'speed' && (
                                            <>
                                                <button
                                                    onClick={() => setSettingsTab('main')}
                                                    className="w-full px-4 py-2 flex items-center gap-2 text-white text-sm border-b border-white/10"
                                                >
                                                    <span className="text-white/60">←</span>
                                                    <span className="font-medium">Playback speed</span>
                                                </button>
                                                {PLAYBACK_SPEEDS.map((speed) => (
                                                    <button
                                                        key={speed}
                                                        onClick={() => changeSpeed(speed)}
                                                        className="w-full px-4 py-2.5 flex items-center justify-between text-white text-sm hover:bg-white/10"
                                                    >
                                                        <span>{speed === 1 ? 'Normal' : `${speed}x`}</span>
                                                        {playbackSpeed === speed && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Fullscreen */}
                            <button
                                onClick={toggleFullscreen}
                                className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                            >
                                {isFullscreen ? (
                                    <Minimize className="w-5 h-5" />
                                ) : (
                                    <Maximize className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
