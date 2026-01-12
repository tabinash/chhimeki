import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoDTO } from "@/types/api/message";

interface ChatState {
    isOpen: boolean;
    isMinimized: boolean;
    activeUser: UserInfoDTO | null;
    activeUserId: number | null; // Explicitly added as requested
}

const initialState: ChatState = {
    isOpen: false,
    isMinimized: false,
    activeUser: null,
    activeUserId: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        openChat: (state, action: PayloadAction<UserInfoDTO>) => {
            state.isOpen = true;
            state.isMinimized = false;
            state.activeUser = action.payload;
            state.activeUserId = action.payload.id;
        },
        closeChat: (state) => {
            state.isOpen = false;
            state.activeUser = null;
            state.activeUserId = null;
        },
        minimizeChat: (state) => {
            state.isMinimized = true;
        },
        restoreChat: (state) => {
            state.isMinimized = false;
        },
    },
});

export const { openChat, closeChat, minimizeChat, restoreChat } = chatSlice.actions;

export const selectActiveUserId = (state: { chat: ChatState }) => state.chat.activeUser?.id;

export default chatSlice.reducer;
