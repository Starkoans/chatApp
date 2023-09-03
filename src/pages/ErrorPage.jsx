import {useNavigate, useRouteError} from "react-router-dom";

function ErrorPage () {
    const error = useRouteError();
    console.error(error);
    const navigate = useNavigate();
    return(
        <div className='d-flex justify-content-center p-5'>
            <div className='flex-column w-50 align-self-center text-center'>
                <h1>ErrorPage</h1>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <button onClick={() => (navigate('/'))}
                        className='btn btn-dark'>
                    Вернуться на главную</button>
            </div>

        </div>
    )

}
export default ErrorPage;