import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/UseAuth.js";
import {useDispatch} from "react-redux";
import {removeUser} from "../store/user.slice.js";
import Navbar from 'react-bootstrap/Navbar';
import {Container} from "react-bootstrap";
import {removeUserChat} from "../store/selectedChat.slice.js";

export default function Layout(){
    const navigate = useNavigate();
    const user = useAuth();
    const dispatch = useDispatch();
    const handleLogOut = ()=>{
        dispatch(removeUser())
        dispatch(removeUserChat())
    }
    console.log(user.isAuth)
    return(
    <>
        {
            user.isAuth?
           <Navbar sticky="top" bg="success" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
               <Container>
                   <Navbar.Brand>FroggyChat</Navbar.Brand>
                   <Link to={'/login'} onClick={handleLogOut}> Выйти </Link>
                   <Link to={`user/${user.uid}`}> Мой профиль</Link>
                   <Link to={`/chat/1`}>Чат</Link>
               </Container>
           </Navbar>
            :
            <>
                <Navbar sticky="top" bg="success" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Link to={'/'}>FroggyChat</Link>
                        <Link to={'/login'} onClick={handleLogOut}> Войти </Link>
                    </Container>
                </Navbar>

            </>
        }
        <Outlet />
    </>

    )
}