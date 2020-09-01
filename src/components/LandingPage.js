import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../App.css'
import ReactCSSTransitionGroup from 'react-transition-group';

export default function LandingPage(props) {
    const user = props.user
    return (
        <div className='landingPage'>
            
            <div className='landingImage'>
                <img src='landingfruits.png'></img>
            </div>
               {user ? null : <Link to='/login'><button className='landingButton'>Login</button></Link>} 
        </div>
    )
}
