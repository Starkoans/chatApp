import {Link} from "react-router-dom";
import Register from "../Components/Register.jsx";

function RegisterPage () {

    return(
        <div>RegisterPage
            <Register/>
            <Link to={'/login'}>Войти</Link>
        </div>
    )

}
export default RegisterPage;