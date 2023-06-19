import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {RegisterForm} from './RegisterForm'
import {setUser} from "../store/user.slice.js";
import {useAuth} from "../hooks/UseAuth.js";
import {setDoc, doc, collection} from '@firebase/firestore'
import {firestore} from "../firebase.js";
import {useNavigate} from "react-router-dom";
function Register(){

    const dispatch = useDispatch();
    const user = useAuth();
    const navigate = useNavigate();
    const handleRegister = async(email, password, username) => {
        const auth = getAuth();
        console.log(auth);

        const userCollectionRef = collection(firestore, "users");

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(
                    (userCredential)=> console.log(userCredential)
                    )
                .catch(
                    (err) => console.log(err)
                );
            // await sendEmailVerification(auth.currentUser).catch((err) =>
            //     console.log(err)
            // );
            await updateProfile(auth.currentUser, { displayName: username })
                .catch((err) => console.log(err));


            await signInWithEmailAndPassword(auth, email, password)
                .then(({user})=> {
                    console.log(user.uid);
                    dispatch(setUser({
                        email: user.email,
                        username: user.displayName,
                        password: user.accessToken,
                        uid: user.uid
                    }))}
            );


            await setDoc(doc(userCollectionRef, user.uid), {
                username: user.username,
                // avatar: user.avatar,
            });

            navigate("/");
        } catch (err) {
            console.log(err);
        }


        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential)=> console.log(userCredential))
        //     .catch((error) => console.log(error))
    }
    // .then(console.log)
    // .catch(console.error)

    return(
        <RegisterForm formTitle="Register" handleSubmit={handleRegister}/>
    )


}
export default Register