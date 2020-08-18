import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import BeverageReview from '../components/BeverageReview'

export default class ReadReviewModalList extends Component {

renderReviews = () => {
    if(this.props.beverageReviews !== null){
        return this.props.beverageReviews.map(review => <BeverageReview review={review} key={review.id}/>)
    }
}

render(){
    return (
        <div>
          {this.renderReviews()}
        </div>
    )
    }
}
