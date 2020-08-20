import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import '../App.css'

export default function LandingPage() {
    return (
        <div className='landingPage'>
            <div className='landingImage'>
                <img src='landingfruits.png'></img>
            </div>
                <Link to='/login'><button className='landingButton'>Login</button></Link>
        </div>
    )
}
