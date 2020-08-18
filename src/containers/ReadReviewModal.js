import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import BeverageReview from '../components/BeverageReview'

export default class ReadReviewModal extends Component {

renderReviews = () => {
    if(this.props.beverageReviews !== null){
        return this.props.beverageReviews.map(review => <BeverageReview review={review} key={review.id}/>)
    }
}

render(){
    return (
        <Modal
        {...this.props}
        centered
      >
        <Modal.Header style={{margin: 'auto'}}>
        <b>Reivews for this beverage</b>
        </Modal.Header>
        <Modal.Body>
          {this.renderReviews()}
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant='secondary' onClick={this.props.onHide} style={{ width: '20%', margin: 'auto', boxShadow: '0px 0px 1px black'}}>Go Back</Button>
        </Modal.Footer>
      </Modal>
    )
    }
}
