import React from 'react'
import Button from 'react-bootstrap/Button'

export default function CartItem(props) {
    const baseAPI = 'http://localhost:3000'
    const item = props.item
    const remove = () => {
        const token = localStorage.token
        fetch(baseAPI + `/order_items/${props.item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'Accept': 'application/json',
              }
        })
        .then(response => response.json())
        .then(response => {
            // console.log(response)
        })
    }

    return (
        <div className='cartItemCard'>
            <p>Beverage: <b>{item ? props.item.name : null}</b></p>
            <p>Flavor: <b>{item ? props.item.base_flavor : null}</b></p>
             <p>Item price: <b>{item ? props.item.item_price : null}$</b></p>
            <Button size='sm' variant='outline-danger' onClick={remove}>Remove From Cart</Button>
        </div>
    )
}
