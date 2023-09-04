import { useAuth } from '../../../hooks/UseAuth.js';
import './Message.scss';
import classNames from 'classnames';
export default function Message({ message, selectedUsername }) {
	const currentUser = useAuth();
		let date = new Date(message.timeStamp.seconds * 1000)
		// let myDate = date.toLocaleDateString()
		let myTime = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
	return (

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
	);
}
