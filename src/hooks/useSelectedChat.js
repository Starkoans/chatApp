import {useSelector} from "react-redux";
import {onValue, ref} from "firebase/database";
import {db} from "../firebase.js";



export function useSelectedChat(){
    const {selectedUserId, username, messagesList, chatId} = useSelector(state => state.selectedChat)

    return(
        {
            username,
            selectedUserId,
            messagesList,
            chatId
        }
    )
}