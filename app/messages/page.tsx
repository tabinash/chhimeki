export default function MessagesPage() {
    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar for Messages */}
            <div className="w-80 border-r border-gray-200">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold">Messages</h1>
                </div>
                <div className="p-2">
                    {/* Chat List */}
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="font-medium">User Name</div>
                        <div className="text-sm text-gray-500">Last message...</div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-400">
                    <p>Select a conversation to start messaging</p>
                </div>
            </div>
        </div>
    );
}
