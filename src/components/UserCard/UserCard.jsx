import "../../App.scss"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import userSvg from './UserSvg.svg'
import './UserCard.scss'
import cn from 'classnames';


export default function UserCard({handleSelect, user }){
    const userCardImg = 'p-1 border-secondary d-flex justify-content-center align-items-center bg-dark-subtle rounded-circle';
    const userCard = 'd-flex flex-row rounded-0 align-items-center p-2 border-0';

    const selected = useSelector(state => state.selectedChat.uid)
    const [isSelected, setIsSelected]= useState(selected) ;
    useEffect(() => {
        console.log(isSelected);
        console.log(selected);
        setIsSelected(selected);
    },[selected])
    return(
        <Card
            onClick={(e) => {
                handleSelect && handleSelect(e, {uid: user.id, username: user.username} )}}
            className={cn(userCard,
                selected===user.id? 'user-card-selected':'user-card') }
        >
            <Card.Img
                className={userCardImg}
                variant="bottom"
                key={user.id}
                src={userSvg}>
            </Card.Img>
            <Card.Text className='ms-3'>{user.username}</Card.Text>
        </Card>
    )
}