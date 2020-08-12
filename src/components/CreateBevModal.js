import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateBevForm from './CreateBevForm'
import { Button } from 'react-bootstrap';

export default function CreateBevModal(props) {
    return (
      <Modal
        {...props}
        className='createBevModal'
        centered
      >
        <Modal.Header style={{margin: 'auto'}}>
        Try out a Beverage Creation Here!
        </Modal.Header>
        <Modal.Body>
          <CreateBevForm {...props} user={props.user}/>
          <Button variant='secondary' onClick={props.onHide} style={{ width: '30%', margin: 'auto'}}>Go Back</Button>
        </Modal.Body>
      </Modal>
    );
  }
