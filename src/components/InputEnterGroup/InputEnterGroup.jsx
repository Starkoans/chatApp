import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import './InputEnterGroup.module.scss'
export default function InputEnterGroup({ handleEnter, isCleanedAfter, initialValue, isRounded, child}){
    const [value, setValue] = useState(initialValue || '');
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEnter(value);
        isCleanedAfter && setValue('')
    }

    return(
        <Form
            onSubmit={(e)=>handleSubmit(e)}>
            <InputGroup className='input-enter'>
            <Form.Control
                required
                className={isRounded?'rounded-start-3 h-100 p-3':'rounded-0 h-100 p-3'}
                type="text"
                onKeyDown={(e)=> {
                    e.key === 'Enter' && value && handleSubmit(e);
                }}
                value={value}
                placeholder={child}
                onChange={event => setValue(event.target.value)}
            />
            <Button
                className={isRounded?'btn-dark rounded-end-3':' btn-dark enter rounded-0'}
                type="submit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
                </svg>
            </Button>
            </InputGroup>
        </Form>
    )
}