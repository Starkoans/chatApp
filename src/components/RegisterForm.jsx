import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useAuth} from '../hooks/UseAuth.js';
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile,} from 'firebase/auth';
import {setUser} from '../store/user.slice.js';
import {collection, doc, setDoc} from '@firebase/firestore';
import {firestore} from '../firebase.js';

function RegisterForm() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isUserCreated, setUserCreated] = useState(null);
	const dispatch = useDispatch();
	const user = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const auth = getAuth();

	const handleRegister = async (email, password, username) => {
		// console.log(auth);
		try {
			await createUserWithEmailAndPassword(auth, email, password).then(
				(userCredential) => {
					console.log(userCredential);
					setError(null);
					setUserCreated(userCredential.user);
				},
			);
			await updateProfile(auth.currentUser, { displayName: username }).catch(
				(err) => {
					console.log(err.message);
				},
			);
			
		} catch (err) {
			console.log(err.message);
			switch (err.message) {
			case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
				setError('Пароль должен содержать минимум 6 символов.');
				break;
			case 'Firebase: Error (auth/email-already-in-use).':
				setError('Этот e-mail уже используется.');
				break;
			default:
				setError(null);
				break;
			}
		}
	};
	
	useEffect(()=>{
		const signIn = async ()=>{
			console.log('мы зашли...');
			await signInWithEmailAndPassword(auth, email, password).then(
				({ user }) => {
					console.log(user.uid);
					dispatch(
						setUser({
							email: user.email,
							username: user.displayName,
							password: user.accessToken,
							uid: user.uid,
						}),
					);
				},
			);
		};
		if(!error && isUserCreated){
			signIn();
		}
	},[auth, dispatch, email, error, isUserCreated, password]);
	
	useEffect(()=>{
		const writeUsername = async ()=>{
			const userCollectionRef = collection(firestore, 'users');
			await setDoc(doc(userCollectionRef, user.uid), {
				username: user.username,
			});
		};
		if(user.username){
			writeUsername();
		}
	},[user.uid, user.username]);

	useEffect(() => {
		if (user.uid) {
			console.log(error);
			navigate(`/user/${user.uid}`);
		}
	}, [navigate, user.uid]);

	// useEffect(() => {}, [error]);

	return (
		<div className="container">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					handleRegister(email, password, username);
				}}
				className="row"
			>
				<h3 className="mb-3">Регистрация</h3>
				<p>
					{'Уже есть аккаунт? '}
					<Link to={'/login'}>Войти</Link>
				</p>

				<label htmlFor="username">Никнейм</label>
				<div className="input-group mb-3">
					<span  className="input-group-text" id="inputGroupPrepend">
              				@
					</span>
					<input required
						className="form-control rounded-end-2"
						id="username"
						type="text"
						value={username}
						placeholder={'Никнейм'}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<div className="invalid-feedback">Please choose a username.</div>
				</div>
				<label htmlFor="email" className="mb-3">Почта
					<input
						id="email"
						required
						className="form-control"
						type="email"
						value={email}
						placeholder="Введите e-mail..."
						onChange={(event) => setEmail(event.target.value)}
					/>
				</label>
				<label htmlFor="password">Пароль
					<input
						required
						id="password"
						className="form-control"
						type="password"
						value={password}
						placeholder="Введите пароль..."
						onChange={(event) => setPassword(event.target.value)}
					/>
				</label>
				{error && (
					<p className="text-danger form-text" >
						{error}
					</p>
				)}

				<button className="btn btn-outline-success btn-lg mt-5" type="submit">
					Зарегистрироваться
				</button>



			</form>
		</div>
	);
}
export { RegisterForm };
