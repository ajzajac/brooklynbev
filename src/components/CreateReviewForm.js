import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export default class CreateReviewForm extends Component {

    state = {
        reviewDescription: '',
        reviewRating: '',
    }

    submitCreateReview = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                description: this.state.reviewDescription,
                rating: this.state.reviewRating,
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.errors){
                alert(resp.errors)
            } else {
                window.location.href='/beverages'
            }
        })
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }


    render() {
        return (
            <div className='reviewModalForm'>
                <form onSubmit={this.submitCreateReview} className='reviewCreateForm'>
                    <p>Review: </p>
                    <input value={this.state.reviewDescription} onChange={this.handleChange} placeholder='Write Your Review Here' />
                    <p>Rating: </p>
                    <input value={this.state.reviewRating} onChange={this.handleChange} placeholder='Rating 1-5' />
                    <Button size='sm' variant='primary' type='submit'>Submit</Button>
                </form>
            </div>
        )
    }
}
