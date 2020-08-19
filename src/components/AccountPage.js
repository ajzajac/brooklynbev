import React, { Component } from 'react'
import Button from 'react-bootstrap/button'
import Beverage from './Beverage'

const baseAPI = 'http://localhost:3000'

export default class AccountPage extends Component {

    state = {
        allBeverages: null,
        beverageReviews: null,
        favorites: null,
    }

    componentDidMount(){
        this.getAllBeverages()
        this.getReviews()
        this.getUserFavorites()
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

    filterUserBeverages = () => {
       if(this.state.allBeverages !== null){
        return this.state.allBeverages.filter(beverage => beverage.user_id === this.props.user.id)
       }
    }

    renderUserBeverages = () => {
        if(this.props.user && this.state.allBeverages !== null){
            const beverages = this.filterUserBeverages()
           return beverages.map(beverage => <Beverage beverage={beverage} user={this.props.user} reviews={this.state.beverageReviews} key={beverage.id}/>)
        }
    }

    getUserFavorites = () => {
        fetch(baseAPI + '/favorites', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                favorites: response
            })
        })
    }

    // filterUserFavorites = () => {
    //     if(this.state.favorites !== null){
    //         return this.state.allBeverages.filter(beverage => favorite.user_id === this.props.user.id)
    //     }
    // }

    getFavoriteBeverages = () => {
        this.filterUserFavorites()
        
    }

    renderFavorites = () => {
        if(this.props.user && this.state.favorites !== null){
            const favorites = this.filterUserFavorites()
            return favorites.map(favorite => <Beverage beverage={favorite} user={this.props.user} reviews={this.state.beverageReviews} key={favorite.id} />)
        }
    }


    render() {
        const user = this.props.user
        return (
            <div className="accountPage">
                <div className='accountPageContainer'>
                    <div className='accountPageLeft'>
                        <div className='accountDetails'>
                        <h3>{user ? this.props.user.username : null}</h3>
                        <p>{user ? this.props.user.email : null}</p>
                        <Button variant='outline-info' size='sm'>Your Cart</Button>
                        <Button variant='outline-info' size='sm'>Favorites</Button>
                        <Button variant='outline-info' size='sm'>Change Email</Button>
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

