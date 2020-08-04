import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'

export default function NavBar(props) {
    return (
        <div className='navBar'>
                <ul>
                    <li><a href='/'>Brooklyn Bev</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/shop'>Shop</a></li>
                    <li><a href='/blog'>Blog</a></li>
                    <li><a href='/contact'>Contact</a></li>
                </ul>
                {!props.user? 
            <>
              <Link className="linkto" to='/signup' ><button variant="contained" color="link" >Signup</button></Link>&nbsp;&nbsp;&nbsp;
              <Link className="linkto" to='/login' ><button variant="contained" color="link" >Login</button></Link>
            </>
            :
            <>
              <button className="linkto" variant="contained" color="link" onClick={props.logOut} style={{'margin-right':12}} >Logout</button>
              <Link className="linkto" to='/' ><button variant="contained" color="primary" >{props.user.username}</button></Link>&nbsp;&nbsp;&nbsp;
            </>
          }
        </div>
    )
}
