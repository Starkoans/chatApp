import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user.slice"
//соединение редьюсеров
const rootReducer = combineReducers({
    user: userReducer,})

export const store = configureStore({
    reducer: rootReducer,
    // devTools: true,
    // preloadedState
})