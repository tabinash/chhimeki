"use client";

interface PostContentProps {
    content: string;
}

export default function PostContent({ content }: PostContentProps) {
    if (!content) return null;

    return (
        <div className="px-4 pb-3">
            <p className="text-gray-800 text-[15px] font-medium leading-[1.6] tracking-[0.01em] whitespace-pre-line">
                {content}
            </p>
        </div>
    );
}
