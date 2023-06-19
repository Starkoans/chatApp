import {useSelector} from "react-redux";

export function useAuth(){
    const {email, password, uid, username, avatar} = useSelector(state => state.user)
    return(
        {
            isAuth: !!password,
            email,
            password,
            username,
            uid,
            avatar
        }
    )
}