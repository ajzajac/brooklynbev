import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import CreateReviewForm from './CreateReviewForm';
import ReadReviewModalList from '../containers/ReadReviewModalList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faBookOpen, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'

const baseAPI = 'http://localhost:3000'

export default class Beverage extends Component {
    
    state = {
        beverageReviews: null,
        showModal: false,
        showReviews: false,
        favorite: false,
        addToCart: false,
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

    addToCart = () => {
        const userId = this.props.user.id  
        const currentOrder = this.props.user.current_order
        const beverageId = this.props.beverage.id
        const bevName = this.props.beverage.name
        const bevFlavor = this.props.beverage.base_flavor

        if (currentOrder === null) {
            const token = localStorage.token
            this.props.addPrice()
            let config4 = {
                method: "POST",
                headers: {
                    'Content-Type':'application/json',
                    "Authorization": token,
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    beverage_id: beverageId,
                })
            }
            
            fetch(baseAPI + '/orders/neworder', config4)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    
                }) 
        } else {
            const token = localStorage.token
            this.props.addPrice()
                let config3 = {
                    method: "POST",
                    headers: {
                    'Content-Type':'application/json',
                    "Authorization": token,
                    'Accept':'application/json'
                    },
                    body: JSON.stringify({
                        order_id: currentOrder,
                        beverage_id: beverageId,
                        name: bevName,
                        base_flavor: bevFlavor,
                        })
                }

                fetch(baseAPI + '/order_items', config3)
                    .then(response => response.json())
                    .then(response => {
                
                    }) 
                    alert("Beverage Has Been Added To Your Shopping Cart")
            }
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
                <p>Extra Flavor: <b>{beverage.extra_flavor ? this.props.beverage.extra_flavor : "None"}</b></p>
            </div>
            <div className='bevCardRight'>
                <FontAwesomeIcon icon={faStar} className='favoriteStar' onClick={this.handleFavorite} size='lg'/>
                <button size='sm' onClick={this.addToCart}>Add to Cart <FontAwesomeIcon icon={faShoppingCart}/></button>
                <button size='sm' variant='outline-secondary' onClick={this.showModal}>Write Review <FontAwesomeIcon icon={faPen}/></button>
                <button size='sm' variant='outline-info' onClick={this.showReviews}>Read Reviews <FontAwesomeIcon icon={faBookOpen}/></button>
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
