import React from 'react'

export default function BeverageInstructions(props) {
    return (
        <div>
            <div className='creationCard'>
                <h3>How this works</h3>
                            <p>Here you are able to pick flavors from our seasonal selection, to completely customize your own beverage and we can ship it to you!</p>
                            <p>First, Start by selecting your base flavor, this will be the main flavor component of your beverage.</p>
                            <p>Next, pick an accent flavor, this will be a more subtle flavor meant to complement the base flavor.</p>
                            <p>Then choose your style of the drink, bubbles or no bubbles, will this be a sparkling beverage or flat?</p>
                        <button variant="primary" onClick={() => props.showModal()}>
                            Create Your Own Beverage Here!
                        </button>
                </div>
        </div>
    )
}
