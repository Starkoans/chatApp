import {onValue, push, ref} from "firebase/database";
import {db} from "../firebase.js";
import {Timestamp} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useAuth} from "../hooks/UseAuth.js";

function ChatPage () {

    const user = useAuth();
    console.log(user);
    const chatId = 'chat1';
    const userId = user.uid;
    const username = user.username;

    const messageRef  = ref(db, `messages/`)

    const [messages, setMessages ] = useState([]);

    //get messages
    useEffect(()=>{
        const getMessages = async() =>{
            const chatRef = ref(db, 'messages/')
            onValue(chatRef, (snapshot) => {
                const data = snapshot.val();
                // console.log(Object.values(data));

                let messagesList = [];
                Object.keys(data).forEach((key) => { messagesList.push({id:key, ...data[key] }) })
                console.log(messagesList);

                setMessages(messagesList);
            });
        };
        getMessages();
    },[])

    const [newMessageText, setNewMessageText] = useState('');

    //send messages
    const handleSubmit = async (e) =>{
        console.log(newMessageText);
        e.preventDefault();

        await push(messageRef, {
            username: username,
            userId: userId,
            text: newMessageText,
            timeStamp: Timestamp.fromDate(new Date()),
            chatID: chatId
        })

        setNewMessageText('');
    }


    return(
        <> {
            user.isAuth? <div>
                {messages.map((message, key)=>{return(
                    <div key={key}>
                        <p>{message.username} : {message.text}</p>
                        {/*<p>{message.serverTimestamp.toDate.toLocaleDateString()}</p>*/}
                    </div>
                )
                })}
                <form onSubmit={handleSubmit}>
                    <input type={"text"}
                           onChange={(e) => setNewMessageText(e.target.value)}
                           value={newMessageText}
                           placeholder={"Написать сообщение..."}
                    />
                    <button type={"submit"}>Отправить</button>
                </form>
            </div> : null
        }

        </>
    )

}
export default ChatPage;