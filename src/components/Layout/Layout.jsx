import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/UseAuth.js";
import { Nav } from 'react-bootstrap';
import { useEffect } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase.js';
import { setDoc } from '@firebase/firestore';
import './Layout.module.scss'
import Logo from '../../../public/Logo.svg';
export default function Layout(){
    const user = useAuth();
    const navigate =useNavigate();
    const isUserExists = async () =>{
        const isUserExists = await getDoc(doc(collection(firestore, 'users'), user.uid));
        return isUserExists.exists() ;
    }

    useEffect(()=>{
        if(user.uid){
            const writeUsernameForFirstTime = async () => {
                await setDoc(doc(firestore, 'users', user.uid), {
                    username: user.username,
                });
            }
            !isUserExists() && writeUsernameForFirstTime();
        }
    },[user.uid])

    useEffect(()=>{
        !user.isAuth && navigate('/login')
    },[])

    return(
    <>
                <Nav sticky="top"
                     expand="lg"
                     className="navbar bg-froggy px-5">
                    <Nav.Item>
                        <Link to='/chat/1'>
                           <img src={Logo} alt='Logo'/>
                        </Link>
                    </Nav.Item>
                    {user.isAuth &&
                        <Nav.Item>
                        <Link to={`user/${user.uid}`} className='text-light'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                 className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </Link>
                        </Nav.Item>

                    }
                </Nav>
        <Outlet className='vh-100'/>
    </>

    )
}