import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "../store/user.slice.js";
import {Form} from "./Form.jsx";
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import 'firebase/auth'
import {provider} from "../firebase.js";
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (email, password)=>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user})=> {
                console.log(user.uid);
                dispatch(setUser({
                    email: user.email,
                    username: user.displayName,
                    password: user.accessToken,
                    uid: user.uid
                }));
                navigate("/");
            })
            .catch((error) => console.log(error))

    }

    const loginWithGoogle = ()=>{


        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                dispatch(setUser({
                    email: user.email,
                    username: user.displayName,
                    password: user.accessToken,
                    uid: user.uid,
                    avatar: user.photoURL
                }))
                navigate("/");
            })

    }
    return(
        <div>
            <Form formTitle="Login" handleSubmit={handleLogin}/>
            <p>Or</p>
            <button onClick={loginWithGoogle}>Log in with Google</button>
        </div>

    )

}
export default Login