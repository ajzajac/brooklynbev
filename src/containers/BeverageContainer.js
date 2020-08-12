import React, { Component } from 'react'
import Beverage from '../components/Beverage'

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
                <h2>All Custom Beverages</h2>
                    <div className='beveragesList'>
                        {this.renderBeverages()}
                    </div> 
            </div>
        )
    }
}
