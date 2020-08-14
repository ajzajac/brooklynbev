import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import SignupForm from '../components/SignupForm'


export default function SignupModal(props) {
    return (
      <Modal
        {...props}
        centered
      >
        <Modal.Header style={{margin: 'auto'}}>
        <b>Please Sign Up Here</b>
        </Modal.Header>
        <Modal.Body className='loginModalBody'>
            <SignupForm {...props}/>
            <p>If you already have an account, <a href='/login'>log in here.</a></p>
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant='secondary' onClick={props.onHide} style={{ width: '20%', margin: 'auto', boxShadow: '0px 0px 2px black'}}>Go Back</Button>
        </Modal.Footer>
      </Modal>
    );
  }
