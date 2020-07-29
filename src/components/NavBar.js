import React from 'react'
import '../App.css';

export default function NavBar() {
    return (
        <div className='navBar'>
            <ul>
                <li><a href='/about'>About</a></li>
                <li><a href='/beverages'>Beverages</a></li>
                <li><a href='/store'>Store</a></li>
                <li><a href='/customize'>Customize Your Own</a></li>
            </ul>
        </div>
    )
}
