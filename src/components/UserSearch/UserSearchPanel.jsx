import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import {onValue, ref } from 'firebase/database'
import {firestore, db} from '../../firebase.js'
import {useAuth} from "../../hooks/UseAuth.js";
import {useDispatch, useSelector} from "react-redux";
import {removeUserChat, selectUser, setChatId, setMessageList} from "../../store/selectedChat.slice.js";
import { useNavigate} from "react-router-dom";
import InputEnterGroup from '../InputEnterGroup/InputEnterGroup.jsx';
import RecentUsers from './RecentUsers.jsx';
import GlobalUsers from './GlobalUsers.jsx';

function UserSearch() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useAuth();
    const selectedChat = useSelector(state => state.selectedChat);
    const [usersQueryList, setUsersQueryList] = useState([]);

    const handleSearchUser = async (username) => {
        const q = query(collection(firestore, "users"),
            where("username", ">=", username),
            where("username", '<=', username +'z'),
            limit(10));
        setUsersQueryList([]);
        const usersQuerySnapshot = await getDocs(q);
        usersQuerySnapshot.empty? setUsersQueryList(null) :
            usersQuerySnapshot.forEach((doc) => {
                setUsersQueryList(usersQueryList => [...usersQueryList, {...doc.data(), uid:doc.id}])
            })
    };
    const handleSelect =  (e, selectedUser) => {
        dispatch(removeUserChat());
        e.preventDefault();
        dispatch(selectUser({
            uid: selectedUser.uid,
            username: selectedUser.username
        }));
        onValue(ref(db, `messages/${currentUser.uid + selectedUser.uid}`), (snapshot) =>
            {
                if(snapshot.exists()) {
                    console.log('первый: ');
                    dispatch(setChatId(currentUser.uid + selectedUser.uid));

                    const data = snapshot.val();
                    let messageList = [];
                    Object.keys(data).forEach((key) => { messageList.push({id:key, ...data[key] }) })
                    dispatch(setMessageList(messageList))
                }
            }
        );
        onValue(ref(db, `messages/${selectedUser.uid + currentUser.uid}`), (snapshot) =>
            {
                if(snapshot.exists()) {
                    dispatch(setChatId(selectedUser.uid + currentUser.uid));
                    console.log('второй')

                    const data = snapshot.val();
                    let messageList = [];
                    Object.keys(data).forEach((key) => { messageList.push({id:key, ...data[key] }) })
                    dispatch(setMessageList(messageList))
                }
            }
        );
        navigate(`${selectedUser.uid}`)
    }
    useEffect(()=>{
        if(selectedChat.chatId === null){
            dispatch(setChatId(currentUser.uid + selectedChat.uid));
        }
    },[selectedChat])

    return(
        <div className="bg-froggy" style={{ maxWidth: '300px'}}>
            <InputEnterGroup handleEnter={handleSearchUser} child='Введите имя...'/>
            <RecentUsers handleSelect={handleSelect}/>
            <GlobalUsers usersQueryList={usersQueryList} handleSelect={handleSelect}/>
        </div>

    )
}

export {UserSearch}