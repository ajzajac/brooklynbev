import React, { Component } from 'react'
import About from '../components/About'
import Beverages from '../components/Beverages'
import { Link, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import NavBar from '../components/NavBar'

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
        // this.props.history.push('/login')
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
            <NavBar user={this.state.currentUser} setUser={this.setUser} logOut={this.logOut}/>
                <Switch>
                    <Route exact path='/' />
                    <Route exact path='/login' render={(routerProps) => <Login setUser={this.setUser} {...routerProps}/>} />
                    <Route exact path='/signup' render={(routerProps) => <Signup setUser={this.setUser} {...routerProps} />} />
                    <Route exact path='/beverages' render={(routerProps) => <Beverages {...routerProps} />}/>
                </Switch>
            </div>
        )
    }
}
