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
        <b>Try out a Beverage Creation Here!</b>
        </Modal.Header>
        <Modal.Body>
          <CreateBevForm {...props} user={props.user}/>
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant='secondary' onClick={props.onHide} style={{ width: '20%', margin: 'auto', boxShadow: '0px 0px 1px black'}}>Go Back</Button>
        </Modal.Footer>
      </Modal>
    );
  }
