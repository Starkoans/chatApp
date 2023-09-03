import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../hooks/UseAuth.js';
import { useEffect, useState } from 'react';
import { removeUser, updateUserName } from '../store/user.slice.js';
import { collection, doc } from 'firebase/firestore';
import { firestore } from '../firebase.js';
import { setDoc } from '@firebase/firestore';
import { removeUserChat } from '../store/selectedChat.slice.js';
import InputEnterGroup from './InputEnterGroup/InputEnterGroup';

export default function Profile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const user = useAuth();
    const [username, setUsername] = useState(user.username || '');
    const [nameIsEdited, setNameIsEdited] = useState(false);

    const handleChangeUsername = async (newName)=>{
        if(newName){
            await updateProfile(auth.currentUser, {
                displayName: newName,
            }).then(() => {
                dispatch(updateUserName(newName));
            }).catch((error) => {
                console.error(error);
            });
            const userCollectionRef = collection(firestore, 'users');
            await setDoc(doc(userCollectionRef, user.uid), {
                username: newName,
            });
            setNameIsEdited(false);
        }
    }
    const handleLogOut = () => {
        dispatch(removeUser())
        dispatch(removeUserChat());
        navigate('/login');
    }
    useEffect(()=>{
        setUsername(username)
    },[user.username])
    return(
        <div className='d-flex justify-content-center'>
            {
                user.isAuth &&
                <div className='border-black rounded-3
                    p-5 m-5  flex-column d-flex bg-froggy'
                    style={{maxWidth:'400px'}}>
                    <div className="d-flex justify-content-center">
                        <img src={user.avatar} alt='user avatar'  className='rounded-circle' />
                    </div>
                    <div className="d-flex justify-content-center m-3">
                        {!nameIsEdited?
                            <>
                                <h3 className="flex align-self-end">{user.username}</h3>
                                <button
                                    className="btn btn-dark ms-3"
                                    onClick={() => setNameIsEdited(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" fill="currentColor"
                                         className="bi bi-pencil" viewBox="0 0 16 19">
                                        <path
                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </button>
                            </>
                        :
                            <>
                                <InputEnterGroup handleEnter={handleChangeUsername}
                                                 initialValue={username}
                                                 child='Новое имя...'
                                                 isRounded={true}/>
                            </>
                        }
                    </div>
                    <div className="d-flex justify-content-center fs-6">{user.email}</div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-dark mt-5 " onClick={handleLogOut}>
                            Выйти
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                 className="bi bi-box-arrow-right ms-2" viewBox="0 0 16 18">
                                <path fillRule="evenodd"
                                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fillRule="evenodd"
                                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </button>
                    </div>

                </div>
            }
        </div>


    )

}