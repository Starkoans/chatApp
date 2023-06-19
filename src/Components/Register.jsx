import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useDispatch} from "react-redux";
import {RegisterForm} from './RegisterForm'
function Register(){

    const dispatch = useDispatch();

    const handleRegister = async(email, password, username) => {



        const auth = getAuth();
        console.log(auth);

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential)=> console.log(userCredential))
                .catch((err) => console.log(err)
            );
            // await sendEmailVerification(auth.currentUser).catch((err) =>
            //     console.log(err)
            // );
            await updateProfile(auth.currentUser, { displayName: username })
                .catch((err) => console.log(err)
            );
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