import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user.slice"
import selectedChatReducer from './selectedChat.slice'
//соединение редьюсеров
const rootReducer = combineReducers({
    user: userReducer,
    selectedChat : selectedChatReducer
})

export const store = configureStore({
    reducer: rootReducer,
    // devTools: true,
    // preloadedState
})