import UserCard from '../UserCard/UserCard.jsx';

export default function GlobalUserSearch({usersQueryList, handleSelect}){
    return(
        <>
            {
                usersQueryList?
                    <>
                        {usersQueryList.length?
                            <div className='ps-2 pb-1 text-light bg-froggy-dark'>Глобальный поиск</div>
                            :null}
                        {usersQueryList.map((user) =>
                            <UserCard user={user} handleSelect={handleSelect} key={user.uid}/>)
                        }
                    </>
                    :
                    <>
                        <div className='ps-2 pb-1 text-light bg-froggy-dark'>Глобальный поиск</div>
                        <p className='p-4 text-light'>Пользователь не найден...</p>
                    </>
            }
        </>
    )
}