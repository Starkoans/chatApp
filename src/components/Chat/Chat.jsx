import {useAuth} from "../../hooks/UseAuth.js";
import { useEffect, useState } from 'react';
import { push, ref} from "firebase/database";
import {db} from "../../firebase.js";
import {Timestamp} from "firebase/firestore";
import Message from "../Message/Message.jsx";
import { useSelector } from 'react-redux';
import UserCard from '../UserCard/UserCard.jsx';
import InputEnterGroup from '../InputEnterGroup/InputEnterGroup.jsx';
import './Chat.scss'

export default function Chat() {
    const selectedChat = useSelector(state => state.selectedChat);
    const currentUser = useAuth();
    const [chat, setChat] = useState(selectedChat);
    useEffect(() => {setChat(selectedChat)},[selectedChat]);
    const messageRef  = ref(db, `messages/${chat.chatId}`)

    const handleSubmit = async (messageText) => {
        await push(messageRef, {
            userId: currentUser.uid,
            text: messageText,
            timeStamp: Timestamp.fromDate(new Date()),
   })
 }

 return(
     <div className="chat bg-candy">
      <UserCard user={{ id:chat.uid, username:chat.username }}/>
         <div className='chat-content'>
             {chat.messagesList === null?
                 <div className='h-100 d-flex justify-content-center align-items-center text-secondary'>
                     <p>Сообщений пока нет...</p>
                 </div>
                 :
                 chat.messagesList.map(
               (message, key) => {return (<Message message={message} key={key}/>)}
           )}
         </div>
         <div className='sticky-bottom p-0'>
             <InputEnterGroup
                 handleEnter={handleSubmit} isCleanedAfter={true} child={'Напишите что-нибудь...'}/>
         </div>

 </div>)
}