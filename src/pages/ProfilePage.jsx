import {useAuth} from "../hooks/UseAuth.js";
import {updateUserName} from '../store/user.slice'
import {getAuth, updateProfile} from "firebase/auth"
import {useEffect, useState} from "react";
import {collection, doc, getDoc, query, where} from "firebase/firestore";
import {firestore} from "../firebase.js";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Image, Row} from "react-bootstrap";

function ProfilePage () {
    const auth = getAuth();
    const user = useAuth();
    const [username, setUsername] = useState(user.username);
    if (username == false)  {setUsername('')}

    const [nameIsEdited, setNameIsEdited] = useState(false);

    // const userDocRef = doc(firestore, "users", user.uid);
    const dispatch = useDispatch();

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
                user.isAuth?
                    <Container className='m-5 d-flex flex-column align-content-center align-middle'>
                        <Row>
                            <Col className='p-0 w-auto'><Image src={user.avatar} roundedCircle className='border border-2 border-secondary' /></Col>
                            <Col>{!nameIsEdited?
                                <>
                                <h4>{user.username}</h4>
                                <button onClick={(e)=> {
                                    setNameIsEdited(true)
                                }}>Изменить ник</button></>
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

                            }</Col>
                            <Col>Почта: {user.email}</Col>
                            <p></p>
                        </Row>

                </Container> :
                    null
            }
        </>


    )

}
export default ProfilePage;