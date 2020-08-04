import React, { Component } from 'react'
import About from '../components/About'
import Beverages from '../components/Beverages'
import { Link, Route, Switch } from 'react-router-dom'
import Login from './Login'

export default class MainContainer extends Component {

    state = {
        currentUser: null,
    }

    setUser = (user) => {
        this.setState({
            currentUser: user
        })
    }

    logOut = () => {
        this.props.history.push('/login')
        this.setState({
            currentUser: null
        })
        setTimeout(() => alert('Sucessfully Logged Out'), 200)
        localStorage.clear()
    }

    autoLogin(){
        if (localStorage.token) {
          fetch(`http://localhost:3000/auto_login`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': localStorage.token
            },
          })
          .then(res => res.json())
          .then(response => {
            // console.log(response)
            this.setState({
              currentUser: response.user
            })
          })
        }
      }

      componentDidMount(){
        this.autoLogin()
    }

    render() {
        return (
            <div>
                <Beverages />
                {/* <About /> */}
            </div>
        )
    }
}
