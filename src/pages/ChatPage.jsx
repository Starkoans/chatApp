import {onValue, push, ref} from "firebase/database";
import {db} from "../firebase.js";
import {Timestamp} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useAuth} from "../hooks/UseAuth.js";
import {UserSearch} from "../components/UserSearchPanel.jsx";
import {Chat} from "../components/Chat.jsx";
import {Outlet} from "react-router-dom";

function ChatPage () {

    const user = useAuth();
    console.log(user);

    const userId = user.uid;
    const username = user.username;



    const [messages, setMessages ] = useState([]);

    //get messages
    // useEffect(()=>{
    //     const getMessages = async() =>{
    //         const chatRef = ref(db, 'messages/')
    //         onValue(chatRef, (snapshot) => {
    //             const data = snapshot.val();
    //             // console.log(Object.values(data));
    //
    //             let messagesList = [];
    //             Object.keys(data).forEach((key) => { messagesList.push({id:key, ...data[key] }) })
    //             console.log(messagesList);
    //
    //             setMessages(messagesList);
    //         });
    //     };
    //     getMessages();
    // },[])




    return(
        <>
            {
                user.isAuth? <div className="d-flex justify-content-center"> <UserSearch/> <Outlet /> </div> : null
            }
        </>
    )

}
export default ChatPage;