import React, { Component } from 'react'
import About from '../components/About'
import Beverages from '../components/Beverages'
import { Link, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import NavBar from '../components/NavBar'
import axios from 'axios'

export default class MainContainer extends Component {

    state = { 
        isLoggedIn: false,
        user: {}
       };

    componentDidMount(){
        this.loginStatus()
    }

    componentWillMount() {
        return this.props.loggedInStatus ? this.redirect() : null
    }
       
    handleLogin = (data) => {
        this.setState({
          isLoggedIn: true,
          user: data.user
        })
    }

    handleLogout = () => {
        this.setState({
        isLoggedIn: false,
        user: {}
        })
    }

    loginStatus = () => {
        axios.get('http://localhost:3000/logged_in', 
       {withCredentials: true})
        .then(response => {
          if (response.data.logged_in) {
            this.handleLogin(response)
          } else {
            this.handleLogout()
          }
        })
        .catch(error => console.log('api errors:', error))
    }

    handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
          this.handleLogout()
          this.history.push('/')
        })
        .catch(error => console.log(error))
      }

    render() {
        return (
            <div>
            <NavBar user={this.state.currentUser} logOut={this.logOut}/>
                <Switch>
                    <Route exact path='/' loggedInStatus={this.state.isLoggedIn}/>
                    <Route exact path='/login' render={(routerProps) => <Login handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} {...routerProps}/>} />
                    <Route exact path='/signup' render={(routerProps) => <Signup handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} {...routerProps} />} />
                    <Route exact path='/beverages' render={(routerProps) => <Beverages {...routerProps} />}/>
                </Switch>
            </div>
        )
    }
}
