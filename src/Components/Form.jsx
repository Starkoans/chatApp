import {useState} from "react";


const Form = ({formTitle, handleSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <form onSubmit={(event)=> {
            event.preventDefault();
            handleSubmit(email, password)
        }}>
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
export {Form}