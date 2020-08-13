import React, { Component } from 'react'
import Button from 'react-bootstrap/button'
import Beverage from './Beverage'

const baseAPI = 'http://localhost:3000'

export default class AccountPage extends Component {

    state = {
        allBeverages: null
    }

    componentDidMount(){
        this.getAllBeverages()
    }

    getAllBeverages = () => {
        fetch(baseAPI + '/beverages', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            this.setState({
                allBeverages: response
            })
        })
    }

    filterUserBeverages = () => {
       if(this.state.allBeverages !== null){
        return this.state.allBeverages.filter(beverage => beverage.user_id === this.props.user.id)
       }
    }

    renderUserBeverages = () => {
        if(this.props.user !== null){
            const beverages = this.filterUserBeverages()
           return beverages.map(beverage => <Beverage beverage={beverage}/>)
        }
    }

    render() {
        const user = this.props.user
        return (
            <div className="accountPage">
                <h2>My Account</h2>
                <div className='accountPageContainer'>
                    <div className='accountPageLeft'>
                        <div className='accountDetails'>
                        <h3>{user ? this.props.user.username : null}</h3>
                        <p>{user ? this.props.user.email : null}</p>
                        <Button size='sm'>My Cart</Button>
                        <Button size='sm'>My Reviews</Button>
                        <Button size='sm'>Saved Beverages</Button>
                        </div>
                    </div>
                    <div className='accountPageRight'>
                        <h3>Your Beverages</h3>
                        {this.renderUserBeverages()}
                    </div>
                </div>
            </div>
        )
    }
}

