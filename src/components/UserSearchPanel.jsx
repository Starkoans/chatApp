import {useEffect, useState} from "react";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {onValue, ref, set, get} from 'firebase/database'
import {firestore, db} from '../firebase.js'
import {useAuth} from "../hooks/UseAuth.js";
import {useDispatch, useSelector} from "react-redux";
import {useSelectedChat} from "../hooks/useSelectedChat.js";
import {removeUserChat, selectUser, setChatId, setMessageList} from "../store/selectedChat.slice.js";
import {Link, useNavigate} from "react-router-dom";
function UserSearch() {

    const [searchUser, setSearchUser]= useState('');
    const [usersQueryList, setUsersQueryList] =useState([]);
    const q = query(collection(firestore, "users"),
        where("username", ">=", searchUser),
        where("username", '<=', searchUser +'z'),
        limit(10));
    const handleSearchUser = async (e) => {
        e.preventDefault();
        dispatch(removeUserChat)
        setUsersQueryList([]);
        // console.log(searchUser)
        const usersQuerySnapshot = await getDocs(q);
        usersQuerySnapshot.empty? setUsersQueryList(null) :
            usersQuerySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                    setUsersQueryList(usersQueryList => [...usersQueryList, {...doc.data(), id:doc.id}])

                })
            // console.log(usersQueryList)


    }
    const currentUser = useAuth();

    // const [chatID, setChatID] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatId = useSelector(state => state.selectedChat.chatId)
    useEffect(()=>{
        //find chat in firebase and load it



        const chatRef = ref(db, `messages/${chatId}`)
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
    },[chatId])
    const handleSelect =  (e, selectedUser) => {
        e.preventDefault();
        dispatch(selectUser({
            uid: selectedUser.uid,
            username: selectedUser.username
        }))


        let chatID= currentUser.uid + selectedUser.uid;

        const chatRefCheck = ref(db, `messages/${chatID}`)

        onValue(chatRefCheck, (snapshot) =>
            {
                if(snapshot.exists()) {
                    console.log('первый')
                }
                else chatID = selectedUser.uid + currentUser.uid;
            }
        );
        onValue(chatRefCheck, (snapshot) =>
            {
                if(snapshot.exists()) {
                    console.log('второй')
                }
                else chatID =null;
            }
        );
        if(chatID){dispatch(setChatId(chatID))}
        else {dispatch(setChatId(currentUser.uid + selectedUser.uid))}

        navigate(`${selectedUser.uid}`)
    }

    return(
        <div className="bg-gradient" style={{background: 'lightgrey', maxWidth: '300px'}}>
            <form onSubmit={handleSearchUser}>
                <input type={"text"}
                       onKeyDown={(e)=> {
                           if (e.key === 'Enter') {
                               handleSearchUser
                           }
                       }}
                       value={searchUser}
                       placeholder={"Найти юзера..."}
                       onChange={event => {
                           setSearchUser(event.target.value);
                       }}/>
                <button type={"submit"}>Найти</button>
            </form>

            {
                usersQueryList?
                usersQueryList.map((user, key)=>{ return(

                    <div onClick={(e)=> {

                        handleSelect(e, {uid: user.id, username: user.username} )
                    }} key={key}
                        style={{display:'flex'}}>
                        <div style={{background: 'dimgrey', width: '50px', height: '50px', borderRadius:'50px'}}></div>
                        <p>{user.username}</p>
                    </div>

                        )
                    }
                ) :
                    <p>Не найдено</p>
            }

        </div>

    )
}

export {UserSearch}