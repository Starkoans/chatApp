import {useEffect, useState} from "react";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {onValue, ref } from 'firebase/database'
import {firestore, db} from '../firebase.js'
import {useAuth} from "../hooks/UseAuth.js";
import {useDispatch, useSelector} from "react-redux";
import {removeUserChat, selectUser, setChatId, setMessageList} from "../store/selectedChat.slice.js";
import { useNavigate} from "react-router-dom";
import UserCard from './UserCard/UserCard.jsx';
import InputEnterGroup from './InputEnterGroup/InputEnterGroup.jsx';
function UserSearch() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [usersQueryList, setUsersQueryList] = useState([]);

    const handleSearchUser = async (username) => {
        const q = query(collection(firestore, "users"),
            where("username", ">=", username),
            where("username", '<=', username +'z'),
            limit(10));

        dispatch(removeUserChat);
        setUsersQueryList([]);
        const usersQuerySnapshot = await getDocs(q);
        usersQuerySnapshot.empty? setUsersQueryList(null) :
            usersQuerySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                    setUsersQueryList(usersQueryList => [...usersQueryList, {...doc.data(), id:doc.id}])
                })

    }
    const currentUser = useAuth();
    const selectedChat = useSelector(state => state.selectedChat);

    useEffect(() => {
        //find chat in firebase and load it
        const chatRef = ref(db, `messages/${selectedChat.chatId}`);
        onValue(chatRef, (snapshot) => {
            if(snapshot.exists()){
                snapshot.forEach(
                    () => {
                        const data = snapshot.val();
                        console.log(data);
                        let messageList = [];
                        Object.keys(data).forEach((key) => { messageList.push({id:key, ...data[key] }) })
                        console.log(messageList);
                        dispatch(setMessageList(messageList))
                    }
                )
            }
            else{
                dispatch(setMessageList(null))
            }
        });
    },[selectedChat.chatId])

    const handleSelect =  (e, selectedUser) => {
        e.preventDefault();
        dispatch(selectUser({
            uid: selectedUser.uid,
            username: selectedUser.username
        }))
        let chatID = currentUser.uid + selectedUser.uid;
        const chatRefCheck = ref(db, `messages/${chatID}`)
        onValue(chatRefCheck, (snapshot) =>
            {
                if(snapshot.exists()) {console.log('первый: ')}
                else chatID = selectedUser.uid + currentUser.uid;
            }
        );
        onValue(chatRefCheck, (snapshot) =>
            {
                if(snapshot.exists()) {console.log('второй')}
                else chatID = null;
            }
        );
        if(chatID){dispatch(setChatId(chatID))}
        else {dispatch(setChatId(currentUser.uid + selectedUser.uid))}
        navigate(`${selectedUser.uid}`)
    }

    return(
        <div className="bg-froggy" style={{ maxWidth: '300px'}}>
            <InputEnterGroup handleEnter={handleSearchUser} child='Введите имя...'/>
            {
                usersQueryList?
                usersQueryList.map((user)=>{
                    return(<UserCard user={user} handleSelect={handleSelect} key={user.uid}/>)
                }
                ):
                    <p className='p-4'>Пользователь не найден...</p>
            }
        </div>

    )
}

export {UserSearch}