import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import CreateReviewForm from './CreateReviewForm';
import ReadReviewModalList from '../containers/ReadReviewModalList';

const baseAPI = 'http://localhost:3000'

export default class Beverage extends Component {
    
    state = {
        beverageReviews: null,
        showModal: false,
        showReviews: false,
        favorite: false,
    }

    componentDidMount(){
        this.findReviews()
    }

    findReviews = () => {
        if(this.props.reviews !== null){
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

    showReviews = () => {
        this.setState({
            showReviews: true,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
            showReviews: false,
        })
    }

    handleFavorite = () => {
        console.log(this.state.favorite)
        fetch(baseAPI + '/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                  beverage_id: this.props.beverage.id,
                  user_id: this.props.user.id
              })
        })
        .then(response => response.json())
        .then(response => {
            if(response.errors){
                alert(response.errors)
            } else {
                alert('Added beverage to favorites!')
            }
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
                {/* <input className='star' type='checkbox' name='favorite' value={this.state.favorite} onChange={this.handleFavorite}></input> */}
                <img src='goldstar.png' onClick={this.handleFavorite} alt='Add to favorites' title='Add to favorites'></img>
                <Button size='sm'>Add to Cart</Button>
                <Button size='sm' variant='outline-secondary' onClick={this.showModal}>Write Review</Button>
                <Button size='sm' variant='outline-info' onClick={this.showReviews}>Read Reviews</Button>
                {/* <Button size='sm'>Add to Favorites</Button> */}
            </div>
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header>
                <Modal.Title style={{margin: 'auto'}}>Write A Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateReviewForm user={this.props.user} beverage={this.props.beverage}/>
                </Modal.Body>
                <Modal.Footer style={{margin: 'auto'}}>
                <Button variant="secondary"  size='sm' onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={this.state.showReviews} onHide={this.handleClose}>
                <Modal.Header>
                <Modal.Title style={{margin: 'auto'}}>{this.props.beverage.name} Reviews</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReadReviewModalList beverage={this.props.beverage} beverageReviews={this.state.beverageReviews}/>
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
