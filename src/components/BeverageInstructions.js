import React from 'react'
import Button from 'react-bootstrap/Button';


export default function BeverageInstructions(props) {
    return (
        <div className='beverageInstructionsPage'>
            <div className='beverageCardsList'>
                <div className='instructionsCard'>
                    <p>You pick from available flavors to completely customize your own beverage and we can ship it to you!</p>
                    <p>We change flavors available each season to use the freshest ingredients possible.</p>
                    <img src='beverage.png' style={{width: '27%', paddingBottom: '15%'}}/>
                </div>
                <div className='instructionsCard'>
                    <p>First, start by selecting your base flavor. This will be the main flavor component of your beverage.</p>
                    <p>We like a big flavor here like a berry or any fruit.</p>
                    <img src='strawberry.png'/>
                </div>
                <div className='instructionsCard'>
                    <p>Next, pick an accent flavor. This will be a more subtle flavor meant to complement the base flavor.</p>
                    <p>We suggest an herb or spice for this flavor, but you can pick another base flavor.</p>
                    <img src='basil.png' style={{marginTop: '7%'}}/>
                </div>
                <div className='instructionsCard'>
                    <p>Then choose your style of the drink, bubbles or no bubbles, will this be a sparkling beverage or flat?</p>
                    <p>Are you looking for a little zip in your drink, or a smooth beverage.</p>
                    <img src='bubbles.png'/>
                </div>
            </div>
            <div className='beverageInstructionsButton'>
                <p>If you're interested, give it a shot here!</p>
                    <Button variant="primary" onClick={() => props.showModal()}>
                        Create Your Own Beverage!
                    </Button> 
            </div>
        </div>
    )
}