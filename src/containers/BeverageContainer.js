import React, { Component } from 'react'
import Beverage from '../components/Beverage'
import ReadReviewModal from './ReadReviewModalList'
import { motion } from 'framer-motion'

const baseAPI = 'http://localhost:3000'

export default class BeverageContainer extends Component {

    state = {
        allBeverages: null,
        beverageReviews: null,
        modalShow: false,
        orderItems: null,
        userCart: null,
        userPastOrders: null,
        cartTotalPrice: null,
        orders: null,
    }

    componentDidMount(){
        this.getReviews()
        this.getOrders()
        new Promise(r => setTimeout(r, 350));
        this.filterUserCart()
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

    getOrders = () => {
        fetch(baseAPI + '/orders', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                orders: response.orders
            })
        })
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

    renderBeverages = () => {
        if(this.props.beverages !== null){
           return this.props.beverages.map(beverage => <Beverage beverage={beverage} addPrice={this.addPriceOptimistically} reviews={this.state.beverageReviews} fetchPrice={this.filterUserCart} fetchOrderItems={this.fetchOrderItems} user={this.props.user} key={beverage.id}/>).reverse()
        }
    }

    addPriceOptimistically = () => {
        let itemPrice = '4.99'
        this.setState({
            cartTotalPrice:  (parseFloat(this.state.cartTotalPrice) + parseFloat(itemPrice)).toFixed(2)
        })
    }

    showModal = () => {
        this.setState({
            modalShow: true
        })
    }
    
    closeModal = () => {
        this.setState({
            modalShow: false
        })
    }

    filterUserCart = () => {
        if(this.state.orders !== null){
            let userCart = this.state.orders.filter(order => order.user_id === this.props.user.id)
            console.log(userCart[userCart.length-1].total_price)
            this.setState({
                userCart: userCart[userCart.length-1],
                userPastOrders: userCart,
                cartTotalPrice: userCart[userCart.length-1].total_price.toFixed(2)
            })
        }
    }

    render() {
        const container = {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                  staggerChildren: .5,
                  ease: "easeIn", 
                  duration: 1,
    
              }
            }
          }

          const container2 = {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                  staggerChildren: 2,
                  ease: "easeIn", 
                  duration: 1,
              }
            }
          }
    
          const item = {
            hidden: { opacity: 0 },
            show: { opacity: 1 }
          }
        return (
            <motion.div variants={container} initial='hidden' animate='show' className='beveragesPage'>
            {this.state.modalShow ? <div><ReadReviewModal /> </div>: <div><h3>Check out some of our beverages</h3>
                <div className='featuredBeveragesContainer'>
                    <motion.div variants={container2} initial='hidden' animate='show' className='slideshowScroll'>
                        <motion.img variants={item} src='kiwisplash.png'></motion.img> 
                        <motion.img variants={item} src='orangesplash.png'></motion.img>
                        <motion.img variants={item} src='pomegranate.png'></motion.img>
                        <motion.img variants={item} src='lavender.png'></motion.img>
                        <motion.img variants={item} src='blueberrysplash.png'></motion.img>
                        <motion.img variants={item} src='strawberrysplash.png'></motion.img>
                        <motion.img variants={item} src='passionfruit.png'></motion.img>
                        <motion.img variants={item} src='watermelon.png'></motion.img>
                        <motion.img variants={item} src='lime.png'></motion.img>
                        <motion.img variants={item} src='raspberry.png'></motion.img>
                    </motion.div>
                </div>
                    <div className='beveragesList'>
                         {this.renderBeverages()}
                    </div> 
                    </div> }
            </motion.div>
        )
    }
}
