import {Link, useNavigate, useRouteError} from "react-router-dom";

function ErrorPage () {
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate();
    return(
        <div>
            <h1>ErrorPage</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <button onClick={(event) => (navigate('/'))}>Вернуться на главную</button>
        </div>
    )

}
export default ErrorPage;