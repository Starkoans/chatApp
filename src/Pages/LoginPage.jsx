import {Link} from "react-router-dom";
import Login from "../Components/Login.jsx";

function LoginPage () {

    return(
        <div>LoginPage
            <Login/>
            <Link to={'/register'}>Зарегистрироваться</Link>
        </div>
    )

}

export default LoginPage;