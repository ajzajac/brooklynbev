import React, { Component } from 'react'
import BeverageReview from '../components/BeverageReview'

export default class ReadReviewModalList extends Component {

renderReviews = () => {
    if(this.props.beverageReviews !== null){
        return this.props.beverageReviews.map(review => <BeverageReview review={review} key={review.id}/>).reverse()
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
