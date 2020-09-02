import React from 'react'
import '../App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'

export default function NavBar(props) {
    return (
        <div className='navBar'>
                <ul>
                    <li><a href='/' style={{color: 'rgba(255, 255, 255, 0.801)'}}><b>Brooklyn Bev</b></a></li>
                    <li><a href='/beverages'> beverages</a></li>
                    {/* <li><a href='/shop'>Shop</a></li> */}
                    <li><a href='/createyourown'>create your own</a></li>
                    {!props.user? <li> <a href='/login'>login</a> </li> : <><li><a href='/profile'>my account</a></li>  <li> <a href='/login' onClick={props.logOut}>logout</a></li></>}
                    <FontAwesomeIcon icon={faShoppingCart}/>
                </ul>
        </div>
    )
}
