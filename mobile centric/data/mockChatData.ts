export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline?: boolean;
    lastSeen?: string;
}

export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    type: 'text' | 'image' | 'file';
    status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
    id: string;
    user: User;
    messages: Message[];
    unreadCount: number;
    lastMessage: {
        text: string;
        timestamp: string;
    };
}

export const currentUser = {
    id: 'current',
    name: 'Abinash',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
};

export const conversations: Conversation[] = [
    {
        id: '1',
        user: {
            id: 'u1',
            name: 'Sita Sharma',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
            isOnline: true,
        },
        unreadCount: 2,
        lastMessage: {
            text: 'Can you share the location?',
            timestamp: '10:30 AM',
        },
        messages: [
            { id: 'm1', senderId: 'current', text: 'Hey Sita, are you still interested in the bookshelf?', timestamp: '10:00 AM', type: 'text', status: 'read' },
            { id: 'm2', senderId: 'u1', text: 'Yes, absolutely! Is it still available?', timestamp: '10:15 AM', type: 'text', status: 'read' },
            { id: 'm3', senderId: 'current', text: 'Yes it is. You can pick it up today.', timestamp: '10:20 AM', type: 'text', status: 'read' },
            { id: 'm4', senderId: 'u1', text: 'Great! What time works for you?', timestamp: '10:25 AM', type: 'text', status: 'delivered' },
            { id: 'm5', senderId: 'u1', text: 'Can you share the location?', timestamp: '10:30 AM', type: 'text', status: 'delivered' },
        ],
    },
    {
        id: '2',
        user: {
            id: 'u2',
            name: 'Ram Bahadur',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
            isOnline: false,
            lastSeen: '2h ago',
        },
        unreadCount: 0,
        lastMessage: {
            text: 'Thanks for the help yesterday!',
            timestamp: 'Yesterday',
        },
        messages: [
            { id: 'm1', senderId: 'u2', text: 'Hello, are you available for community cleanup?', timestamp: 'Yesterday', type: 'text', status: 'read' },
            { id: 'm2', senderId: 'current', text: 'Yes, I will be there.', timestamp: 'Yesterday', type: 'text', status: 'read' },
            { id: 'm3', senderId: 'u2', text: 'Thanks for the help yesterday!', timestamp: 'Yesterday', type: 'text', status: 'read' },
        ],
    },
    {
        id: '3',
        user: {
            id: 'u3',
            name: 'Gita Koirala',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
            isOnline: true,
        },
        unreadCount: 5,
        lastMessage: {
            text: 'The event starts at 5 PM.',
            timestamp: 'Mon',
        },
        messages: [
            { id: 'm1', senderId: 'u3', text: 'The event starts at 5 PM.', timestamp: 'Mon', type: 'text', status: 'delivered' },
        ],
    },
    {
        id: '4',
        user: {
            id: 'u4',
            name: 'Hari Krishna',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
            isOnline: false,
            lastSeen: '1d ago',
        },
        unreadCount: 0,
        lastMessage: {
            text: 'Is the room still available?',
            timestamp: 'Sun',
        },
        messages: [
            { id: 'm1', senderId: 'current', text: 'Room for rent post.', timestamp: 'Sun', type: 'text', status: 'read' },
            { id: 'm2', senderId: 'u4', text: 'Is the room still available?', timestamp: 'Sun', type: 'text', status: 'read' },
        ],
    },
];
