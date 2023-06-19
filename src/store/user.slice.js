import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    uid:null,
    username:null,
    email:null,
    password:null,
    avatar: null
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
        updateUserName: (state, action)=>{
            state.username = action.payload;
        },
        removeUser: (state)=>{
            state.uid = null;
            state.username = null;
            state.email = null;
            state.password = null;
        }
    }
})

export const {setUser, removeUser, updateUserName} = userSlice.actions;
export default userSlice.reducer;