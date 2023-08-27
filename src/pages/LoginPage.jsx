import {Link} from "react-router-dom";
import Login from "../components/Login.jsx";
import {Container} from "react-bootstrap";

function LoginPage () {

    return(
        <Container className='d-flex justify-content-center' style={{width:'400px'}}>
        <Container className='
         m-3
         p-3
         d-flex
         flex-column
         text-center
         rounded-3
         '
                   style={{background: 'linear-gradient(48deg, rgba(255,249,101,1) 0%, rgba(148,243,109,1) 61%, rgba(162,246,83,1) 100%)'
                       , color: 'rgb(72,94,32)'}}
        >
            <Login/>
            Ещё не зарегистрированы?
            <Link to={'/register'}>Зарегистрироваться</Link>
        </Container>
        </Container>
    )

}

export default LoginPage;