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
          <CreateBevForm/>
        </Modal.Body>
        
          <button onClick={props.onHide} style={{marginBottom: '2%'}}>Close</button>
        
      </Modal>
    );
  }
