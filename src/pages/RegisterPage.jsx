import {Container} from 'react-bootstrap';
import {RegisterForm} from '../components/RegisterForm.jsx';

function RegisterPage () {
	return(
		<Container className='d-flex m-3 p-4 rounded-3 border border-1 border-success' style={{width:'400px'}}>
			<RegisterForm/>
		</Container>
	);

}
export default RegisterPage;