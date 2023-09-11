import {useAuth} from "../../hooks/UseAuth.js";
import { useEffect, useRef, useState } from 'react';
import { push, ref} from "firebase/database";
import { db } from '../../firebase.js';
import { Timestamp } from 'firebase/firestore';
import Message from "./Message/Message.jsx";
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../UserCard/UserCard.jsx';
import InputEnterGroup from '../InputEnterGroup/InputEnterGroup.jsx';
import './Chat.module.scss'
import { removeFromRecentChats, unshiftToRecentChats } from '../../store/user.slice.js';
import NoMessagesImg from '../../../public/HappyFroggy.svg';

export default function Chat() {
    const dispatch = useDispatch();
    const selectedChat = useSelector(state => state.selectedChat);
    const currentUser = useAuth();
    const [chat, setChat] = useState(selectedChat);
    useEffect(() => {setChat(selectedChat)},[selectedChat]);


    const handleSubmit = async (messageText) => {
        await push(ref(db, `messages/${chat.chatId}`), {
            userId: currentUser.uid,
            text: messageText,
            timeStamp: Timestamp.fromDate(new Date()),
        })
        dispatch(removeFromRecentChats(chat.uid));
        dispatch(unshiftToRecentChats({ uid:chat.uid, username: chat.username }));
    }
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chat.messagesList]);

    let prevDay;
    if(chat.messagesList[0]) {
        prevDay = new Date(chat.messagesList[0].timeStamp.seconds * 1000);
    }

 return(
     <div className="chat bg-candy">
      <UserCard user={{ id:chat.uid, username:chat.username }}/>
         <div className='chat-content'>
             {(chat.messagesList && !chat.messagesList.length)?
                 <div className='h-100 d-flex flex-column justify-content-center align-items-center text-secondary'>
                     <img src={NoMessagesImg} alt='No messages'/>
                     <p>Сообщений пока нет...</p>
                 </div>
                 :
                 chat.messagesList.map(
               (message, key) => {
                   let currDay = new Date(message.timeStamp.seconds * 1000);
                   if (prevDay.toLocaleDateString() !== currDay.toLocaleDateString()
                       || key === 0 ) {
                       prevDay = currDay;
                       return (<Message message={message}
                                        day={true}
                                        selectedUsername={chat.username}
                                        key={key}/>)
                   }
                   else return (<Message message={message} day={false} selectedUsername={chat.username} key={key}/>)}
           )}
             <div ref={bottomRef} />
         </div>
         <div className='sticky-bottom p-0'>
             <InputEnterGroup
                 handleEnter={handleSubmit} isCleanedAfter={true} child={'Напишите что-нибудь...'}/>
         </div>

 </div>)
}