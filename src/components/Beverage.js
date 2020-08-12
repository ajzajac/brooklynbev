import React from 'react'

export default function Beverage(props) {
    const beverage = props.beverage
    return (
        <div className='beverageCard'>
            <div className='bevCardLeft'>
                <h2>{beverage ? props.beverage.name : null}</h2>
                <p>Main Flavor: {beverage ? props.beverage.base_flavor : null}</p>
                <p>Accent Flavor: {beverage ? props.beverage.secondary_flavor : null}</p>
                <p>Water Type: {beverage ? props.beverage.water_type : null}</p>
                <p>Extra Flavor: {beverage ? props.beverage.extra_flavor : null}</p>
            </div>
            <div className='bevCardRight'>
                <button>Add to Cart</button>
                <button>Read Reviews</button>
                <button>Save for Later</button>
            </div>
        </div>
    )
}
