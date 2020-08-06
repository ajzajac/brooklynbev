import React from 'react'
import '../App.css';

export default function NavBar(props) {
    return (
        <div className='navBar'>
                <ul>
                    <li><a href='/'>Brooklyn Bev</a></li>
                    <li><a href='/beverages'>Beverages</a></li>
                    <li><a href='/shop'>Shop</a></li>
                    {/* <li><a href='/blog'>Blog</a></li> */}
                    <li><a href='/createyourown'>Create Your Own</a></li>
                    {!props.user? <li> <a href='/login'>Login</a> </li> : <><li><a href='/profile'>My Account</a></li>  <li> <a href='/login' onClick={props.logOut}>Logout</a></li></>}
                </ul>
        </div>
    )
}
