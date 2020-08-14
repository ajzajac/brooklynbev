import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import LoginForm from '../components/LoginForm'


export default function LoginModal(props) {
    return (
      <Modal
        {...props}
        centered
      >
        <Modal.Header style={{margin: 'auto'}}>
        <b>Please Log In</b>
        </Modal.Header>
        <Modal.Body className='loginModalBody'>
            <LoginForm {...props}/>
            <p>If you don't have an account, <a href='/signup'>register here.</a></p>
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant='secondary' onClick={props.onHide} style={{ width: '20%', margin: 'auto', boxShadow: '0px 0px 1px black'}}>Go Back</Button>
        </Modal.Footer>
      </Modal>
    );
  }
