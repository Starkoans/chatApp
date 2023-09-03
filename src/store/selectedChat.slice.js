import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    uid:null,
    username:null,
    messagesList: [],
    chatId:null
};

const selectedChatSlice = createSlice({
    name: "selectedChat",
    initialState,
    reducers :{
        selectUser:(state, action) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
        },
        setChatId: (state, action)=>{
            state.chatId = action.payload;
        },
        setMessageList:(state,action)=>{
            state.messagesList = action.payload;
        },
        removeUserChat: (state)=>{
            state.uid = null;
            state.username = null;
            state.messagesList = [];
            state.chatId = null;
        }
    }
})

export const {selectUser, setMessageList, setChatId, removeUserChat} = selectedChatSlice.actions;
export default selectedChatSlice.reducer;