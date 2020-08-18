import React from 'react'

export default function BeverageReview(props) {
    const review = props.review
    return (
        <div className='reviewCard'>
          <p> Beverage:</p> {review ? props.review.beverage.name : null}
        </div>
    )
}
