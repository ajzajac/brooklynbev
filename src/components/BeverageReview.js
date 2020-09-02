import React from 'react'

export default function BeverageReview(props) {
    const review = props.review
    console.log(review)
    return (
        <div className='reviewCard'>

          <h4><b>{review.name ? review.name : "Anonymous"} says:</b> </h4> <p>  {review ? props.review.description : null}</p>
          <h4><b>{review.name ? review.name : "Anonymous"} rates it:</b> </h4> <p>  {review ? props.review.rating : null} out of 5 stars</p>
        </div>
    )
}
