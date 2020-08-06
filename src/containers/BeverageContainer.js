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
            <div>
                {this.renderBeverages()}
            </div>
        )
    }
}
