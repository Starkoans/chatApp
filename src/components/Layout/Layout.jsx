import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/UseAuth.js";
import { Nav } from 'react-bootstrap';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { firestore } from '../../firebase.js';
import { setDoc } from '@firebase/firestore';
import './Layout.scss'
import Logo from '../../../public/Logo.svg';
export default function Layout(){
    const user = useAuth();
    const navigate =useNavigate();

    useEffect(()=>{
        if(user.uid){
            const userRef = doc(firestore, 'users', user.uid)
            const writeUsernameForFirstTime = async () => {
                await setDoc(userRef, {
                    username: user.username,
                });
            }
                console.log(userRef);
                if (!userRef.converter) writeUsernameForFirstTime();
        }
    },[user.uid])

    useEffect(()=>{
        !user.isAuth && navigate('/login')
    },[])

    return(
    <>
                <Nav sticky="top"
                     expand="lg"
                     className="navbar navbar-expand-lg bg-froggy px-5">
                        <Link to='/chat/1'>
                           <img src={Logo} alt='Logo'/>
                        </Link>

                    {user.isAuth &&
                        <>
                            <Link to={`user/${user.uid}`} className='text-light'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                     className="bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </Link>
                        </>
                    }
                </Nav>
        <Outlet className='vh-100'/>
    </>

    )
}