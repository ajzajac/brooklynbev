import React, { Component } from 'react'
import Beverage from '../components/Beverage'
import Carousel from 'react-bootstrap/Carousel'
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
            {this.state.modalShow ? <div><ReadReviewModal /> </div>: <div><h3>Check out some of our beverages</h3>
                <div className='featuredBeveragesContainer'>
                    <div className='slideshowScroll'>
                        <img src='kiwisplash.png'></img> 
                        <img src='orangesplash.png'></img>
                        <img src='pomegranate.png'></img>
                        <img src='lavender.png'></img>
                        <img src='blueberrysplash.png'></img>
                        <img src='strawberrysplash.png'></img>
                        <img src='passionfruit.png'></img>
                        <img src='watermelon.png'></img>
                        <img src='lime.png'></img>
                        <img src='raspberry.png'></img>
                    </div>
                </div>
                    <div className='beveragesList'>
                         {this.renderBeverages()}
                    </div> 
                    </div> }
            </div>
        )
    }
}
