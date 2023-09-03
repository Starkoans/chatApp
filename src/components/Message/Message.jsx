import { useAuth } from '../../hooks/UseAuth.js';
import './Message.scss';
import classNames from 'classnames';
export default function Message({ message }) {
	const currentUser = useAuth();
	return (
		<div
			className={classNames('message', message.userID===currentUser.id? 'my-message':'not-my-message')}
		>
			{message.userID!==currentUser.id && <div className='not-my-message-triangle'/>}
				<div
					className='message-box'
					key={message.key}>
					<p>{message.text}</p>
				</div>
			{message.userID===currentUser.id && <div className='my-message-triangle'/>}
		</div>
	);
}
