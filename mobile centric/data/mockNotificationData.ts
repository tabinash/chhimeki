export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'system' | 'mention';
    actor: {
        name: string;
        avatar: string;
    };
    content: string;
    timestamp: string;
    isRead: boolean;
    link?: string;
}

export const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'like',
        actor: {
            name: 'Priya Sharma',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        content: 'liked your post "Community Clean-up Drive Success!"',
        timestamp: '2 mins ago',
        isRead: false,
    },
    {
        id: '2',
        type: 'comment',
        actor: {
            name: 'Ramesh Gupta',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        },
        content: 'commented: "Great initiative! Count me in for the next one."',
        timestamp: '1 hour ago',
        isRead: false,
    },
    {
        id: '3',
        type: 'system',
        actor: {
            name: 'Chhimeki Team',
            avatar: 'https://ui-avatars.com/api/?name=Chhimeki&background=0D8ABC&color=fff',
        },
        content: 'Welcome to Chhimeki! Complete your profile to connect with neighbors.',
        timestamp: '2 hours ago',
        isRead: true,
    },
    {
        id: '4',
        type: 'follow',
        actor: {
            name: 'Sita Verma',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        },
        content: 'started following you.',
        timestamp: 'Yesterday',
        isRead: true,
    },
    {
        id: '5',
        type: 'mention',
        actor: {
            name: 'Hari Thapa',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        },
        content: 'mentioned you in a post: "@Abinash can you share the details?"',
        timestamp: 'Yesterday',
        isRead: true,
    },
];
