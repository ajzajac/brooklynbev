import React, { Component } from 'react'
import Button from 'react-bootstrap/button'
import Beverage from './Beverage'
import Modal from 'react-bootstrap/Modal'
import CartItem from './CartItem'

const baseAPI = 'http://localhost:3000'

export default class AccountPage extends Component {

    state = {
        allBeverages: null,
        beverageReviews: null,
        showFavorites: false,
        favorites: null,
        orders: null,
        userCart: null,
        showModal: false,
        orderItems: null,

    }

    async componentDidMount(){
        this.getAllBeverages()
        this.getReviews()
        this.getFavorites()
        this.getOrders()
        await new Promise(r => setTimeout(r, 200));
        this.getOrderItems()
        this.filterUserCart()
    }

    // componentDidUpdate = (prevProps, prevState) => {
    //     if(prevState.orderItems !== this.state.orderItems ){
    //         this.getOrderItems()
    //     }
    // }

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

    getOrders = () => {
        fetch(baseAPI + '/orders', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response.orders)
            this.setState({
                orders: response.orders
            })
        })
    }

    getOrderItems = () => {
        fetch(baseAPI + '/order_items', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            let orderList = response.order_items.filter(item => item.order_id === this.props.user.current_order)
            // console.log(orderList)
            this.setState({
                orderItems: orderList
            })
        })
    }

    filterUserCart = () => {
        if(this.state.orders !== null){
            let userCart = this.state.orders.filter(order => order.user_id === this.props.user.id)
            // console.log(userCart)
            this.setState({
                userCart: userCart
            })
        }
    }

    clearCart = () => {
        fetch(baseAPI + `/users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                current_order: 0
              })
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
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

    handleModalShow = () => {
        fetch(baseAPI + '/order_items', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            let orderList = response.order_items.filter(item => item.order_id === this.props.user.current_order)
            // console.log(orderList)
            this.setState({
                orderItems: orderList,
                showModal: !this.state.showModal
            })
        })
    }



    renderCartItems = () => {
        if(this.state.orderItems !== null){
            return this.state.orderItems.map(cartItem => <CartItem item={cartItem} removeFromCart={this.removeFromCart} key={cartItem.id}/>)
        }
    }

    removeItem = () => {
        let newItems = this.state.orderItems.filter(order => order.id !== this.props.item.id)
        this.setState({
            orderItems: newItems
        })
    }

    removeFromCart = () => {
        const token = localStorage.token
        fetch(baseAPI + `/order_items/${this.props.item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            
        })
        
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
                        <Button variant='outline-info' size='sm' onClick={this.handleModalShow}>Your Cart</Button>
                        <Button variant='outline-info' size='sm' onClick={this.handleFavoritesClick}>Favorites</Button>
                        <Button variant='outline-info' size='sm' onClick={this.clearCart}>Change Email</Button>
                        </div>
                    </div>
                    <div className='accountPageRight'>
                        <h3>Your Beverages</h3>
                        {this.state.showFavorites ? this.renderFavorites() : this.renderUserBeverages()}
                    </div>
                </div>
                <Modal show={this.state.showModal} onHide={this.handleModalShow}>
                <Modal.Header>
                <Modal.Title style={{}}>Your Cart</Modal.Title>
                     <p>Order ID # {user ? this.props.user.current_order : null}</p> 
                </Modal.Header>
                <Modal.Body>
                    {this.renderCartItems()}
                </Modal.Body>
                <Modal.Footer style={{margin: 'auto'}}>
                <Button variant='primary' size='sm' onClick={this.clearCart}>Checkout</Button>
                <Button variant="secondary"  size='sm' onClick={this.handleModalShow}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}

