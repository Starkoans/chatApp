import { useAuth } from '../../hooks/UseAuth.js';
import { useEffect, useState } from 'react';
import ProfileUsername from './ProfileUsername.jsx';
import Logout from './Logout.jsx';

export default function Profile(){
    const user = useAuth();
    const [username, setUsername] = useState(user.username || '');

    useEffect(()=>{
        setUsername(username)
    },[user.username])
    return(
        <div className='d-flex justify-content-center'>
            {
                user.isAuth &&
                <div className='rounded-3
                    p-5 m-5  flex-column d-flex bg-froggy'
                    style={{maxWidth:'400px'}}>
                    <div className="d-flex justify-content-center">
                        <img src={user.avatar} alt='user avatar'  className='rounded-circle' />
                    </div>
                    <ProfileUsername username={username}/>
                    <div className="d-flex justify-content-center fs-6">{user.email}</div>
                    <Logout/>
                </div>
            }
        </div>


    )

}