import React, { Component } from 'react'
import Beverage from '../components/Beverage'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"

export default class BeverageContainer extends Component {

    renderBeverages = () => {
        if(this.props.beverages !== null){
           return this.props.beverages.map(beverage => <Beverage beverage={beverage} key={beverage.id}/>)
        }
    }


    render() {
        console.log(this.props.beverages)
        return (
            <div className='beveragesPage'>
                <div className='bevCarousel'>
                    <h2>Featured Beverages</h2>
                    <Carousel autoPlay infiniteLoop className='beverageCarousel'>
                        <div>
                            <img src="https://www.acouplecooks.com/wp-content/uploads/2019/09/Whiskey-Sour-111s.jpg" />
                            <p className="legend"></p>
                        </div>
                        <div>
                            <img src="https://stevethebartender.com.au/wp-content/uploads/2015/11/winter-sun-cocktail.jpg" />
                            <p className="legend"></p>
                        </div>
                        <div>
                            <img src="https://149366112.v2.pressablecdn.com/wp-content/uploads/2019/01/winter-wonderland-cocktail.jpg" />
                            <p className="legend"></p>
                        </div>
                    </Carousel>
            </div>
            <h3>Below are more custom beverages!</h3>
                    <div className='beveragesList'>
                        {this.renderBeverages()}
                    </div> 
            </div>
        )
    }
}
