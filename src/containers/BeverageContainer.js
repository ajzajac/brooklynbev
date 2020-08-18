import React, { Component } from 'react'
import Beverage from '../components/Beverage'
import Carousel from 'react-bootstrap/Carousel'
import FeaturedBeverageCard from '../components/FeaturedBeverageCard'
import ReadReviewModal from './ReadReviewModalList'

const baseAPI = 'http://localhost:3000'

export default class BeverageContainer extends Component {

    state = {
        allBeverages: null,
        beverageReviews: null,
        modalShow: false,
    }

    componentDidMount(){
        this.getReviews()
    }

    getReviews = () => {
        fetch(baseAPI + '/reviews', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            this.setState({
                beverageReviews: response
            })
        })
    }

    getBeverages = () => {
        fetch(baseAPI + '/beverages', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            this.setState({
                allBeverages: response
            })
        })
    }

    renderBeverages = () => {
        if(this.props.beverages !== null){
           return this.props.beverages.map(beverage => <Beverage beverage={beverage} reviews={this.state.beverageReviews} user={this.props.user} key={beverage.id}/>)
        }
    }

    showModal = () => {
        this.setState({
            modalShow: true
        })
    }
    
    closeModal = () => {
        this.setState({
            modalShow: false
        })
    }


    render() {
        
        return (
            <div className='beveragesPage'>
            {this.state.modalShow ? <div><ReadReviewModal /> </div>: <div><h3>Here Are Some Beverages We Think You May Like</h3>
                <div className='featuredBeveragesContainer'>
                    <Carousel style={{height: '10%'}}>
                        <Carousel.Item>
                            {this.props.recommendedBeverages ? <FeaturedBeverageCard beverage={this.props.recommendedBeverages[0]}/> : null } 
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                        {this.props.recommendedBeverages ? <FeaturedBeverageCard beverage={this.props.recommendedBeverages[1]}/> : null }
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                        {this.props.recommendedBeverages ? <FeaturedBeverageCard beverage={this.props.recommendedBeverages[2]}/> : null }
                            <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                    <div className='beveragesList'>
                        {this.renderBeverages()}
                    </div> </div> }
            </div>
        )
    }
}
