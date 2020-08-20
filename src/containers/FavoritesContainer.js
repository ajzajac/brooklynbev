import React, { Component } from 'react'
import Beverage from '../components/Beverage'

const baseAPI = 'http://localhost:3000'

export default class FavoritesContainer extends Component {

    state = {
        favorites: null,
    }

    componentDidMount(){
        this.getFavorites()
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


    renderFavorites = () => {

    }

    render() {
        console.log(this.state.favorites)
        return (
            <div>
                
            </div>
        )
    }
}
