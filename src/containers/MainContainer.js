import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import NavBar from '../components/NavBar'
import AccountPage from '../components/AccountPage'
import CreateYourOwn from './CreateYourOwn'
import BeverageContainer from './BeverageContainer'
import LandingPage from '../components/LandingPage'
import { Alert } from 'reactstrap'

const baseAPI = 'http://localhost:3000'

export default class MainContainer extends Component {

    state = {
        currentUser: null,
        isLoggedIn: false,
        allBeverages: null,
        recommendedBeverages: null,
        userBeverages: null,
        beverageReviews: null,
        visibleFavorite: false,
        visibleCart: false,
        visibleCreated: false,
    }
    
    async componentDidMount() {
        this.autoLogin()
        this.getBeverages()
        this.getReviews()
        await new Promise(r => setTimeout(r, 500)); 
        this.filterUserBeverages()
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
            this.setState({
              currentUser: response.user,
              isLoggedIn: true,
            })
          })
        }
      }

      filterUserBeverages = () => {
        if(this.state.userBeverages !== null){
         let userBeverages = this.state.allBeverages.filter(beverage => beverage.user_id === this.state.currentUser.id)
         this.setState({
             userBeverages: userBeverages
         })
        }
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

    showAlert = () => {
        this.setState({visibleFavorite:true},()=>{
            window.setTimeout(()=>{
              this.setState({visibleFavorite:false})
            },3000)
          });
    }

    showCartAlert = () => {
        this.setState({visibleCart:true},()=>{
            window.setTimeout(()=>{
              this.setState({visibleCart:false})
            },3000)
          });
    }

    showCreatedAlert = () => {
        this.setState({visibleCreated:true},()=>{
            window.setTimeout(()=>{
              this.setState({visibleCreated:false})
            },3000)
          });
    }

    render() { 
        return (
            <div>
                 <NavBar user={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} logOut={this.logOut}/>
                 <Alert color='light' isOpen={this.state.visibleFavorite} className='alert'><p>Added beverage to your Favorites!</p></Alert>
                 <Alert color='light' isOpen={this.state.visibleCart} className='alert'><p>Added beverage to your Cart!</p></Alert>
                 <Alert color='light' isOpen={this.state.visibleCreated} className='alert'><p>Your beverage has been created and you can see it in your account page!</p></Alert>
                        <Switch>
                            <Route exact path='/' render={(routerProps) => <LandingPage {...routerProps} user={this.state.currentUser}/>} />
                            <Route exact path='/login' render={(routerProps) => <Login setUser={this.setUser} user={this.state.currentUser} {...routerProps}/>} />
                            <Route exact path='/signup' render={(routerProps) => <Signup setUser={this.setUser} user={this.state.currentUser} {...routerProps} />} />
                            <Route exact path='/beverages' render={(routerProps) => <BeverageContainer showCartAlert={this.showCartAlert} recommendedBeverages={this.state.recommendedBeverages} showAlert={this.showAlert} beverages={this.state.allBeverages} user={this.state.currentUser} {...routerProps} />}/>
                            <Route exact path='/profile' render={(routerProps) => <AccountPage user={this.state.currentUser} showCartAlert={this.showCartAlert} allBeverages={this.state.allBeverages} showAlert={this.showAlert} reviews={this.state.beverageReviews} isLoggedIn={this.state.isLoggedIn} {...routerProps} />}/>
                            <Route exact path='/createyourown' render={(routerProps) => <CreateYourOwn user={this.state.currentUser} showCreatedAlert={this.showCreatedAlert} {...routerProps} />}/>
                        </Switch>
            </div>
        )
    }
}
