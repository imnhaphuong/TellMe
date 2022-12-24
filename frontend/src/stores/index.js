import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
//redux-logger
import thunk from 'redux-thunk';
import messageSlice from "./slices/messageSlice";
import conversationSlice from "./slices/conversationSlice";
const middleware = [thunk]
export const storeRoot = configureStore({
    reducer: {
        messageReducer: messageSlice,
        converReducer: conversationSlice

    }
},
    applyMiddleware(...middleware)
)


