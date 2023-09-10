import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    uid:null,
    username:null,
    email:null,
    password:null,
    avatar: null,
    recentChats:[]
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers :{
        setUser:(state, action) => {
            state.uid = action.payload.uid;
            state.password = action.payload.password;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
        },
        setRecentChats:(state, action)=>{
            state.recentChats = action.payload;
        },
        unshiftToRecentChats:(state,action)=>{
             state.recentChats.unshift(action.payload);
        },
        removeFromRecentChats:(state, action)=>{
            const newRecentChats = state.recentChats.filter(chat => chat.uid !== action.payload)
            state.recentChats = newRecentChats;
        },
        updateUserName: (state, action)=>{
            state.username = action.payload;
        },
        removeUser: (state)=>{
            state.uid = null;
            state.username = null;
            state.email = null;
            state.password = null;
            state.recentChats = [];
        }
    }
})

export const {setUser, removeUser, updateUserName, setRecentChats, removeFromRecentChats, unshiftToRecentChats} = userSlice.actions;
export default userSlice.reducer;