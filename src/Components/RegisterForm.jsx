import {useState} from "react";


const RegisterForm = ({formTitle, handleSubmit}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return(
        <form onSubmit={(event)=> {
            event.preventDefault();
            handleSubmit(email, password, username)
        }}>
            <input
                type={"text"}
                value={username}
                placeholder={"username"}
                onChange={event => setUsername(event.target.value)}/>
            <input type={"text"}
                   value={email}
                   placeholder={"email"}
                   onChange={event => setEmail(event.target.value)}/>
            <input type={"text"}
                   value={password}
                   placeholder={"password"}
                   onChange={event => setPassword(event.target.value)}/>
            <button type={"submit"}>{formTitle}</button>
        </form>
    )
}
export {RegisterForm}