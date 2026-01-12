import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import modalReducer from "./slices/modalSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
