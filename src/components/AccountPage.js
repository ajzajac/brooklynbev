import React from 'react'

export default function AccountPage(props) {
   const user = props.isLoggedIn
    return (
        <div>
        <h1>My Account</h1>
            <h2>Account: {user ? props.user.username : null}</h2>
            <p>Email: {user ? props.user.email : null}</p>
            <div>
                {/* when user has beverages, they will be rendered here */}
                {/* {props.user.beverages.map()} */}
            </div>
        </div>
    )
}
