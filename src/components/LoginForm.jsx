import { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {setUser} from '../store/user.slice.js';
import { provider } from '../firebase.js';
import { useAuth } from '../hooks/UseAuth.js';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user.uid);
                dispatch(setUser({
                    email: user.email,
                    username: user.displayName,
                    password: user.accessToken,
                    uid: user.uid
                }));
            })
            .catch((error) => {
                console.log(error);
                switch (error.message){
                case  'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
                    setError('Слишком много попыток входа. Аккаунт временно заблокирован. Попробуйте зайти позже.');
                    break;
                case 'Firebase: Error (auth/wrong-password).':
                    setError('Неправильный пароль.');
                    break;
                case 'Firebase: Error (auth/user-not-found).' :
                    setError('Пользователь не найден.');
                    break;
                default:
                    setError(null);
                    break;
                }
            });
    };
    useEffect(()=>{
        user.isAuth && navigate(`/chat/1`);
    },[user.isAuth])
    const loginWithGoogle = async () => {
        const auth = getAuth();
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    username: user.displayName,
                    password: user.accessToken,
                    uid: user.uid,
                    avatar: user.photoURL
                }));
            });
    };


    return(
        <div className="container mt-3 flex-column d-flex rounded-3 bg-candy" style={{width:'300px'}}>
        <form
            className="container mt-3 flex-column  d-flex"
            onSubmit={(event)=> {
            event.preventDefault();
            handleLogin(email, password)
        }}>
            <h3>Авторизация</h3>

                <label className='mb-3 form-text'>Почта
                <input
                    required
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Введите e-mail..."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                </label>
                    <label htmlFor="password" className='mb-3 form-text'>Пароль
                    <input
                        required
                        className="form-control"
                        id="password"
                        type="password"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={event => setPassword(event.target.value)}/>
                    </label>

            {error? <span className='text-danger p-3 text-center'>{error}</span> :null }
            <button className='btn btn-outline-dark mt-3' type="submit">
                Войти
            </button>
        </form>
            <div className='mt-3 d-flex flex-column text-center'>
                Или
                <button
                    className='m-3 p-2 btn btn-dark'
                    onClick={loginWithGoogle}>
                    Войти иcпользуя Google
                </button>

            </div>
            <div className="container text-center">
                <p>
                    {'Ещё не зарегистрированы? '}
            <Link to={'/register'}>Зарегистрироваться</Link></p>
            </div>
        </div>
    )
}
export {LoginForm}