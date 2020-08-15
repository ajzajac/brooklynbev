import React, { Component } from 'react'
import Beverage from '../components/Beverage'
import Carousel from 'react-bootstrap/Carousel'
import FeaturedBeverageCard from '../components/FeaturedBeverageCard'

const baseAPI = 'http://localhost:3000'

export default class BeverageContainer extends Component {

    state = {
        userBeverages: null,
        recommendedBeverages: null,
        allBeverages: null,
    }

    componentDidMount(){
        this.getBeverages()
        this.filterUserBeverages()
        this.getRecommendedBeverages()
        
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
           return this.props.beverages.map(beverage => <Beverage beverage={beverage} key={beverage.id}/>)
        }
    }

    filterUserBeverages = () => {
        console.log(this.state.allBeverages)
        if(this.state.allBeverages !== null){
         let userBeverages = this.state.allBeverages.filter(beverage => beverage.user_id === this.props.user.id)
         console.log("hello")
         this.setState({
             userBeverages: userBeverages
         })
        }
     }

    getRecommendedBeverages = () => {
        if(this.state.userBeverages !== null){
            let recommendedBeverages = this.props.beverages.filter(beverage => beverage.base_flavor === this.state.userBeverages[0].base_flavor || this.state.userBeverages[1].base_flavor)
            console.log("hello")
            this.setState({
                recommendedBeverages: recommendedBeverages
            })
        }
    }

    renderCarouselItems = () => {

    }



    render() {
        
        return (
            
            <div className='beveragesPage'>
            <h3>Here Are Some Beverages We Think You May Like</h3>
            <div className='featuredBeveragesContainer'>
            <Carousel style={{height: '10%'}}>
                <Carousel.Item>
                    {this.state.recommendedBeverages ? <FeaturedBeverageCard beverage={this.state.recommendedBeverages[0]}/> : null } 
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                {this.state.recommendedBeverages ? <FeaturedBeverageCard beverage={this.state.recommendedBeverages[1]}/> : null }
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                {this.state.recommendedBeverages ? <FeaturedBeverageCard beverage={this.state.recommendedBeverages[2]}/> : null }
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
                    <div className='beveragesList'>
                        {this.renderBeverages()}
                    </div> 
            </div>
        )
    }
}
