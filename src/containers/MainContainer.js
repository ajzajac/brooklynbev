import React, { Component } from 'react'
import Beverages from '../components/Beverages'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import NavBar from '../components/NavBar'
import AccountPage from '../components/AccountPage'
import CreateYourOwn from './CreateYourOwn'
import BeverageContainer from './BeverageContainer'

const baseAPI = 'http://localhost:3000'

export default class MainContainer extends Component {

    state = {
        currentUser: null,
        isLoggedIn: false,
        allBeverages: null,
    
    }
    
    componentDidMount(){
        this.autoLogin()
        this.getBeverages()
    }
    
    getBeverages = () => {
        fetch(baseAPI + '/beverages', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            this.setState({
                allBeverages: response
            })
        })
    }

    setUser = (user) => {
        this.setState({
            currentUser: user,
            isLoggedIn: true
        })
    }

    logOut = () => {
        this.setState({
            currentUser: null,
            isLoggedIn: false,
        })
        setTimeout(() => alert('Sucessfully Logged Out'), 200)
        localStorage.removeItem('token')
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
            // console.log(response.user)
            this.setState({
              currentUser: response.user,
              isLoggedIn: true,
            })
          })
        }
      }

    

    render() {
        return (
            <div>
            <NavBar user={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}/>
                <Switch>
                    <Route exact path='/' currentUser={this.state.currentUser}/>
                    <Route exact path='/login' render={(routerProps) => <Login setUser={this.setUser} user={this.state.currentUser} {...routerProps}/>} />
                    <Route exact path='/signup' render={(routerProps) => <Signup setUser={this.setUser} user={this.state.currentUser} {...routerProps} />} />
                    <Route exact path='/beverages' render={(routerProps) => <BeverageContainer beverages={this.state.allBeverages} {...routerProps} />}/>
                    <Route exact path='/profile' render={(routerProps) => <AccountPage user={this.state.currentUser} allBeverages={this.state.allBeverages} isLoggedIn={this.state.isLoggedIn} {...routerProps} />}/>
                    <Route exact path='/createyourown' render={(routerProps) => <CreateYourOwn user={this.state.currentUser} {...routerProps} />}/>
                </Switch>
            </div>
        )
    }
}
