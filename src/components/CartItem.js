import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

const baseAPI = 'http://localhost:3000'


export default class CartItem extends Component {
    
    state = {
        cartChange: false,
    }

    remove = () => {
        const token = localStorage.token
        fetch(baseAPI + `/order_items/${this.props.item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                  order_id: this.props.orderId
              })
        })
        .then(response => response.json())
        .then(response => {
            this.props.fetchOrderItems()
            this.props.fetchPrice()
        })
    }

render(){
    const item = this.props.item
    return (
        <div className='cartItemCard'>
            <div className='cartItemCardLeft'>
                <p>Beverage: <b>{item ? this.props.item.name : null}</b></p>
                <p>Flavor: <b>{item ? this.props.item.base_flavor : null}</b></p>
                <p>Item price: <b>${item ? this.props.item.item_price : null}</b></p>
             </div>
             <div className='cartItemCardRight'>
                 <Button size='sm' variant='outline-danger' onClick={this.remove}>Remove From Cart</Button>
             </div>
            
        </div>
    )
}
}
