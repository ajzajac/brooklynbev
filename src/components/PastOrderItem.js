import React from 'react'

export default function PastOrderItem(props) {
    const order = props.order
    let date = props.order.created_at.toString()
    let newDate = new Date(date)
    console.log(newDate)
    return (
        <div className='previousOrderCard'>
            <div className='previousOrderList'>
                <p>Order ID: #{order ? props.order.id : null}</p>
                <p>Total Price: ${order ? props.order.total_price : null}</p>
                <button>View</button>
                {/* <p>Date: {order ? newDate : null}</p> */}
            </div>
        </div>
    )
}
