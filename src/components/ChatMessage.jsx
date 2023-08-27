import { useSelectedChat } from '../hooks/useSelectedChat.js';
import { useAuth } from '../hooks/UseAuth.js';
import './ChatMessage.css';
export default function ChatMessage({ message, key }) {
	const selectedChat = useSelectedChat();
	const currentUser = useAuth();

	return (
		<div key={key} className="container mx-2">
			<p>
				{message.userID === currentUser.id
					? currentUser.username
					: selectedChat.username}{' '}
			</p>
			<div className=" bg-white rounded-1 not-my-message">
				<p className="px-2 py-1">{message.text}</p>
			</div>

			{/*<p>{message.serverTimestamp.toDate.toLocaleDateString()}</p>*/}
		</div>
	);
}
