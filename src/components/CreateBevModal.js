import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CreateBevForm from './CreateBevForm'

export default function CreateBevModal(props) {
    return (
      <Modal
        {...props}
        className='createBevModal'
      >
        <Modal.Header>
          <Modal.Title id="modal-title">
            Create a Beverage
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBevForm/>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
  