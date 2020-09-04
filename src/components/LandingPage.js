import React from 'react'
import '../App.scss'
import About from './About'
import LandingImages from './LandingImages'

export default function LandingPage(props) {
    return (
        <div className='landingPage'>
            <About />
            <LandingImages />
        </div>
                
    )
}
