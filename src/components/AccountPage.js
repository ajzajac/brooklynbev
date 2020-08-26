import React, { Component } from 'react'
import Button from 'react-bootstrap/button'
import Beverage from './Beverage'

const baseAPI = 'http://localhost:3000'

export default class AccountPage extends Component {

    state = {
        allBeverages: null,
        beverageReviews: null,
        showFavorites: false,
        favorites: null,
    }

    componentDidMount(){
        this.getAllBeverages()
        this.getReviews()
        this.getFavorites()
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

    handleFavoritesClick = () => {
        this.setState({
            showFavorites: !this.state.showFavorites
        })
    }

    getFavorites = () => {
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

    filterUserFavorites = () => {
        if(this.state.favorites !== null){
            return this.state.favorites.filter(favorite => favorite.user_id === this.props.user.id)
        }
    }

    renderFavorites = () => {
        if(this.props.user && this.state.favorites !== null){
            const beverages = this.filterUserFavorites()
           return beverages.map(beverage => <Beverage beverage={beverage} user={this.props.user} reviews={this.state.beverageReviews} key={beverage.id}/>)
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
                        <Button variant='outline-info' size='sm' onClick={this.handleFavoritesClick}>Favorites</Button>
                        <Button variant='outline-info' size='sm'>Change Email</Button>
                        </div>
                    </div>
                    <div className='accountPageRight'>
                        <h3>Your Beverages</h3>
                        {this.state.showFavorites ? this.renderFavorites() : this.renderUserBeverages()}
                    </div>
                </div>
            </div>
        )
    }
}

