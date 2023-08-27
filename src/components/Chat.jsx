import {useAuth} from "../hooks/UseAuth.js";
import {useState} from "react";
import {onValue, push, ref} from "firebase/database";
import {db} from "../firebase.js";

import {useSelectedChat} from "../hooks/useSelectedChat.js";

import {Timestamp} from "firebase/firestore";
import ChatMessage from "./ChatMessage.jsx";

function Chat() {

 const selectedChat = useSelectedChat();

const currentUser = useAuth();
const [newMessageText, setNewMessageText] = useState('');

 //send messages
 const messageRef  = ref(db, `messages/${selectedChat.chatId}`)
 const handleSubmit = async (e) =>{
  if(newMessageText){

   console.log(newMessageText);
   console.log(selectedChat.chatId);
   e.preventDefault();

   await push(messageRef, {
    userId: currentUser.uid,
    text: newMessageText,
    timeStamp: Timestamp.fromDate(new Date()),
   })

   setNewMessageText('');
  }

 }

 return( <div className="bg-warning" style={{maxWidth: '950px'}} >
  {selectedChat.messagesList === null? <p>Сообщений пока нет...</p>:
      <div style={{maxHeight: '600px', overflow: 'auto'}}>
   {selectedChat.messagesList.map(
       (message, key) => {
        return (
             <ChatMessage message={message} key={key}/>
        )
       }
   )}

  </div>
  }
  <form onSubmit={handleSubmit}>
   <input type={"text"}
          onChange={(e) => setNewMessageText(e.target.value)}
          value={newMessageText}
          placeholder={"Написать сообщение..."}
   />
   <button type={"submit"}>Отправить</button>
  </form>
 </div>)
}
export {Chat}