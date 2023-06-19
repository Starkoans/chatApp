import {useState} from "react";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {onValue, ref, set} from 'firebase/database'
import {firestore, db} from '../firebase.js'
function UserSearch() {
    const [searchUser, setSearchUser]= useState('');
    const [usersQueryList, setUsersQueryList] =useState([]);
    const q = query(collection(firestore, "users"),
        where("username", ">=", searchUser),
        where("username", '<=', searchUser +'z'),
        limit(10));
    const handleSearchUser = async (e) => {
        if(e.key === 'Enter'){
            setUsersQueryList([]);
            e.preventDefault();
            console.log(searchUser)
            const usersQuerySnapshot = await getDocs(q);
            usersQuerySnapshot.empty? console.log('Ничего не найдено') :
                usersQuerySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    setUsersQueryList(usersQueryList => [...usersQueryList, doc.data()])

                })
            console.log(usersQueryList)
        }

    }

    const handleSelect = async (e) => {
        const chatRef = ref(db, `messages/${currentUser + selectedUser}`)
        await onValue(chatRef, (snapshot) => {
            if(snapshot.exists()){
                snapshot.forEach(
                    (doc) => {
                        console.log(snapshot.val());}
                )
            }
            else{
                set(chatRef, {
                    username: name,
                    email: email,
                    profile_picture : imageUrl
                });
            }
            const data = snapshot.val();
        })
    }


    return(
        <div style={{background: 'lightgrey'}}>
            <form onSubmit={handleSearchUser}>
                <input type={"text"}
                       onKeyDown={handleSearchUser}
                       value={searchUser}
                       placeholder={"Найти юзера..."}
                       onChange={event => setSearchUser(event.target.value)}/>
                <button type={"submit"}>Найти</button>
            </form>

            {
                usersQueryList.map((user, key)=>{ return(
                    <div key={key}
                        style={{display:'flex'}}>
                        <div style={{background: 'dimgrey', width: '50px', height: '50px', borderRadius:'50px'}}></div>
                        <p>{user.username}</p>
                    </div>
                        )
                    }
                )
            }

        </div>

    )
}

export {UserSearch}