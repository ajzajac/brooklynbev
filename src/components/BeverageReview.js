import React from 'react'

export default function BeverageReview(props) {
    const review = props.review
    return (
        <div className='reviewCard'>
          <h4>Review: </h4> <p>{review ? props.review.description : null}</p>
          <h4>Rating: </h4> <p>{review ? props.review.rating : null} stars</p>
        </div>
    )
}
