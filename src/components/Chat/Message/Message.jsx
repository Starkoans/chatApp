import { useAuth } from '../../../hooks/UseAuth.js';
import './Message.module.scss';
import classNames from 'classnames';
export default function Message({ message, day, selectedUsername }) {
	const currentUser = useAuth();
		let date = new Date(message.timeStamp.seconds * 1000)
		 let myDate = date.toLocaleDateString()
		let myTime = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
	return (
		<>
			{day &&
				<div  className='justify-content-center my-3' >
				<p style={{maxWidth:'100px'}} className='
				text-center bg-light
				bg-opacity-50 m-auto rounded-2
				text-dark text-opacity-50'>{myDate}</p>
				</div>
				}
			<div
				className={classNames('message', message.userId===currentUser.uid? 'my-message':'not-my-message')}
				>
					{message.userId!==currentUser.uid && <div className='not-my-message-triangle'/>}
						<div
							className='message-box'
							key={message.key}>
							{message.userId!==currentUser.uid && <p className='username'><b>{selectedUsername}</b></p>}
							{message.userId===currentUser.uid && <p className='username'><b>{currentUser.username}</b></p>}
							<p>{message.text}</p>
							<p className='time'>{myTime}</p>
						</div>
					{message.userId===currentUser.uid && <div className='my-message-triangle'/>}
			</div>
		</>
	);
}
