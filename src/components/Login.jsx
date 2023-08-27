import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setUser} from '../store/user.slice.js';
import {LoginForm} from './LoginForm.jsx';
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';

import {provider} from '../firebase.js';
import {useState} from 'react';
import {Alert, Button, Container} from 'react-bootstrap';

function Login() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const handleLogin = async (email, password)=>{
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password)
			.then(({user})=> {
				console.log(user.uid);
				dispatch(setUser({
					email: user.email,
					username: user.displayName,
					password: user.accessToken,
					uid: user.uid
				}));
				navigate('/');
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

	const loginWithGoogle = ()=>{


		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log(user);
				dispatch(setUser({
					email: user.email,
					username: user.displayName,
					password: user.accessToken,
					uid: user.uid,
					avatar: user.photoURL
				}));
				navigate('/');
			});

	};
	return(
		<Container >
			<LoginForm formTitle="Войти" handleSubmit={handleLogin}/>
			{error? <Alert className='m-4' variant={'danger'}>{error}</Alert> :null }
			<Container className='mt-3 d-flex flex-column text-center'>
                Или
				<Button className='m-3 p-2' onClick={loginWithGoogle}>Войти иcпользуя Google</Button>

			</Container>

		</Container>

	);

}
export default Login;