import {Link, Outlet} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../hooks/UseAuth.js";
import {useDispatch} from "react-redux";
import {removeUser} from "../store/user.slice.js";

export default function Layout(){

    const user = useAuth();
    const dispatch = useDispatch();
    const handleLogOut = ()=>{
        dispatch(removeUser())
    }
    console.log(user.isAuth)
    return(
    <>
        {
            user.isAuth?
            <>
                <Link to={'/login'} onClick={handleLogOut}> Выйти </Link>
                <Link to={`user/${user.uid}`}> Мой профиль</Link>
                <Link to={`/chat/1`}>Чат</Link>
            </>
            :
            <>
                <Link to={'/login'} onClick={handleLogOut}> Войти </Link>
            </>
        }
        <Outlet />
    </>

    )
}