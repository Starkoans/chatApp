import {useAuth} from "../hooks/UseAuth.js";
import {UserSearch} from "../components/UserSearchPanel.jsx";
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ChatPage () {
    const navigate = useNavigate();
    const user = useAuth();
    useEffect(()=>{
        !user.isAuth && navigate('/login')
    },[])
    return(
        <>
            {
                user.isAuth?
                    <div className="d-flex justify-content-center m-4" style={{minHeight: '75vh'}}>
                        <UserSearch/>
                        <Outlet />
                    </div> : null
            }
        </>
    )

}
export default ChatPage;