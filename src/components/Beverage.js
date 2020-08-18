import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { render } from '@testing-library/react';
import Modal from 'react-bootstrap/Modal'
import CreateReviewForm from './CreateReviewForm';


export default class Beverage extends Component {
    
    state = {
        beverageReviews: null,
        showModal: false,
    }

    findReviews = () => {
        if(this.props.beverage !== null){
           this.setState({
               beverageReviews: this.props.reviews.filter(review => this.props.beverage.id === review.beverage_id)
           }) 
        }
    }

    showModal = () => {
        this.setState({
            showModal: true,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }


    render(){
        const beverage = this.props.beverage
    return (
        <div className='beverageCard'>
            <div className='bevCardLeft'>
                <h2><b>{beverage ? this.props.beverage.name : null}</b></h2>
                <p>Main Flavor: <b>{beverage ? this.props.beverage.base_flavor : null}</b></p>
                <p>Accent Flavor: <b>{beverage ? this.props.beverage.secondary_flavor : null}</b></p>
                <p>Water Type: <b>{beverage ? this.props.beverage.water_type : null}</b></p>
                <p>Extra Flavor: <b>{beverage ? this.props.beverage.extra_flavor : null}</b></p>
            </div>
            <div className='bevCardRight'>
                <Button size='sm'>Add to Cart</Button>
                <Button size='sm' variant='secondary' onClick={this.showModal}>Write Review</Button>
                <Button size='sm' variant='info' >Read Reviews</Button>
                <Button size='sm'>Add to Favorites</Button>
            </div>
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header>
                <Modal.Title style={{margin: 'auto'}}>Beverage Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateReviewForm />
                </Modal.Body>
                <Modal.Footer style={{margin: 'auto'}}>
                <Button variant="secondary"  size='sm' onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    }
}
