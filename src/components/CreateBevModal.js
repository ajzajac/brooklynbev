import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateBevForm from './CreateBevForm'

export default function CreateBevModal(props) {
    return (
      <Modal
        {...props}
        className='createBevModal'
        centered
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <CreateBevForm {...props} user={props.user}/>
        </Modal.Body>
        
          <button onClick={props.onHide} style={{marginBottom: '2%'}}>Go Back</button>
        
      </Modal>
    );
  }
