import UserCard from '../UserCard/UserCard.jsx';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase.js';
import { setRecentChats } from '../../store/user.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/UseAuth.js';

export default function RecentUsers({handleSelect}){
    const dispatch = useDispatch();
    const currentUser = useAuth();
    const recentChats = useSelector(state => state.user.recentChats);
    const [recentChatsList, setRecentChatsList] = useState(recentChats);

    async function updateRecentChats(chatList){
        await updateDoc(doc(collection(firestore, 'users'), currentUser.uid), {
            recentChats: chatList,
        });
    }
    useEffect(()=>{
        setRecentChatsList(recentChats);
        recentChats.length && updateRecentChats(recentChats);
    },[recentChats])

    useEffect(()=>{
        async function getRecentMessageRef() {
            const userInfo = await getDoc(doc(collection(firestore, 'users'), currentUser.uid));
            if (userInfo.exists()) {
                const data = userInfo.data();
                console.log("getRecentMessageRef Document data:", data);
                data.recentChats && dispatch(setRecentChats(data.recentChats))
            }
        }
        getRecentMessageRef();

    },[])

    return(
        <>
            <div className='ps-2 pb-1 text-light bg-froggy-dark'>Недавние</div>
            {
            recentChatsList.length?
                <>
                    {recentChatsList.map((user) =>
                        <UserCard user={user} handleSelect={handleSelect} key={user.uid} />)}
                </>
                :
                <p className='p-4 text-light'>Тут пока никого нет...</p>

        }</>
    )
}