import {useAuth} from "../hooks/UseAuth.js";
import {updateUserName} from '../store/user.slice'
import {getAuth, updateProfile} from "firebase/auth"
import {useEffect, useState} from "react";
import {collection, doc, getDoc, query, where} from "firebase/firestore";
import {firestore} from "../firebase.js";
import {useDispatch, useSelector} from "react-redux";

function ProfilePage () {


    const auth = getAuth();
    const user = useAuth();
    const [username, setUsername] = useState(user.username);
    if (username == false)  {setUsername('')}

    const [nameIsEdited, setNameIsEdited] = useState(false);

    // const userDocRef = doc(firestore, "users", user.uid);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     const getMessages = async () =>{
    //         const userDocSnap = await getDoc(userDocRef);
    //        try{
    //            if (userDocSnap.exists()) {
    //                console.log("Document data:", userDocSnap.data());
    //            } else {
    //                // docSnap.data() will be undefined in this case
    //                console.log("No such document!");
    //            }
    //        }catch (error){console.log(error)}
    //     }
    //
    //     getMessages();
    //
    // },[])




    const handleChangeUsername = async (e)=>{
        e.preventDefault();
        if(username){
            await updateProfile(auth.currentUser, {
                    displayName: username,
                }).then(() => {
                dispatch(updateUserName(username));
                    console.log('ok');
                }).catch((error) => {
                    console.error(error);
                });

            setNameIsEdited(false);
        }
    }
    return(
        <>
            {
                user.isAuth?  <div>My profile
                    <h3> Ник: {user.username}</h3>
                    {!nameIsEdited?
                        <button onClick={(e)=> {
                            setNameIsEdited(true)
                        }}>Изменить ник</button>
                        :
                        <>
                            <form onSubmit={handleChangeUsername}>
                                <input type={"text"}
                                       value={username}
                                       onChange={(event)=>setUsername(event.target.value)}
                                />
                                <button type={"submit"}>Сохранить</button>
                            </form>
                        </>

                    }


                    <p>Почта: {user.email}</p>
                    <img src={user.avatar}/>
                </div> :
                    null
            }
        </>


    )

}
export default ProfilePage;