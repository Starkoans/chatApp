import {useState} from "react";
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

    const handleSelect =  (e, selectedUser) => {
        dispatch(removeUserChat());
        e.preventDefault();
        dispatch(selectUser({
            uid: selectedUser.uid,
            username: selectedUser.username
        }))
        onValue(ref(db, `messages/${currentUser.uid + selectedUser.uid}`), (snapshot) =>
            {
                if(snapshot.exists()) {
                    console.log('первый: ');
                    console.log()
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
        if(!selectedChat.chatId){dispatch(setChatId(currentUser.uid + selectedUser.uid))}
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