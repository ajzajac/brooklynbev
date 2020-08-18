import React from 'react'
import Modal from 'react-boostrap/Modal'
import Button from 'react-bootstrap/Button'
import CreateReviewForm from '../components/CreateReviewForm'

export default function CreateReviewModal(props) {
    return (
        <Modal
            {...props}
            
            centered
            >
            <Modal.Header style={{margin: 'auto'}}>
            <b>Try out a Beverage Creation Here!</b>
            </Modal.Header>
            <Modal.Body>
                <CreateReviewForm {...props} user={props.user}/>
            </Modal.Body>
            <Modal.Footer>
            <Button size='sm' variant='secondary' onClick={props.onHide} style={{ width: '20%', margin: 'auto', boxShadow: '0px 0px 1px black'}}>Go Back</Button>
            </Modal.Footer>
        </Modal>
    )
}
