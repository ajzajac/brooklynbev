import React, { Component } from 'react'
import Beverage from '../components/Beverage'
import Carousel from 'react-bootstrap/Carousel'
import ReadReviewModal from './ReadReviewModalList'
import { motion } from 'framer-motion'

const baseAPI = 'http://localhost:3000'

export default class BeverageContainer extends Component {

    state = {
        allBeverages: null,
        beverageReviews: null,
        modalShow: false,
    }

    componentDidMount(){
        this.getReviews()
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

    renderBeverages = () => {
        if(this.props.beverages !== null){
           return this.props.beverages.map(beverage => <Beverage beverage={beverage} reviews={this.state.beverageReviews} user={this.props.user} key={beverage.id}/>).reverse()
        }
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
