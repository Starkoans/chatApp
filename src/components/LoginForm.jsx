import {useState} from "react";
import Form from 'react-bootstrap/Form';
import {Button, Container, Row} from "react-bootstrap";

const LoginForm = ({formTitle, handleSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <Container className="mt-3 flex-column  d-flex justify-content-center flex-column">


        <Form onSubmit={(event)=> {
            event.preventDefault();
            handleSubmit(email, password)
        }}>
            <Form.Group className='mb-3 ' controlId="formBasicEmail">
                <Form.Label>Почта</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Введите e-mail..."
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </Form.Group >
                <Form.Group  className='mb-3' controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={event => setPassword(event.target.value)}/>
            </Form.Group>

            <Row className='p-2'>
            <Button className='p-2' type="submit">
                {formTitle}
            </Button>
            </Row>
        </Form>
        </Container>
    )
}
export {LoginForm}