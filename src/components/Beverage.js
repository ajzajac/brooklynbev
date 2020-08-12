import React from 'react'
import { Button } from 'react-bootstrap';

export default function Beverage(props) {
    const beverage = props.beverage
    return (
        <div className='beverageCard'>
            <div className='bevCardLeft'>
                <h2><b>{beverage ? props.beverage.name : null}</b></h2>
                <p>Main Flavor: <b>{beverage ? props.beverage.base_flavor : null}</b></p>
                <p>Accent Flavor: <b>{beverage ? props.beverage.secondary_flavor : null}</b></p>
                <p>Water Type: <b>{beverage ? props.beverage.water_type : null}</b></p>
                <p>Extra Flavor: <b>{beverage ? props.beverage.extra_flavor : null}</b></p>
            </div>
            <div className='bevCardRight'>
                <Button size='sm'>Add to Cart</Button>
                <Button size='sm' variant='secondary'>Read Reviews</Button>
                <Button size='sm' variant='info'>Save for Later</Button>
            </div>
        </div>
    )
}
