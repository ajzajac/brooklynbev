import React, { Component } from 'react'

export default class CreateYourOwn extends Component {

    state = {
        beverageName: '',
        baseFlavor: '',
        secondaryFlavor: '',
        waterType: '',
        extraFlavor: '',
    }

    submitCreateBeverage = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/beverages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            name: this.state.beverageName,
            base_flavor: this.state.baseFlavor,
            secondary_flavor: this.state.secondaryFlavor,
            water_type: this.state.waterType,
            extra_flavor: this.state.extraFlavor,
            user_id: this.props.user.id,
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.errors){
                alert(resp.errors)
            } else {
                alert("Your beverage has been created")
                this.props.history.push('/beverages')
            }
            
        })
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    render() {
        return (
            <div className='createBeveragePage'>
            <h2>Create Your Own Custom Beverage</h2>
                <div className='creationCard'>
                    <div className='creationCardLeft'>
                        <p>Try out a creation here!</p>
                        <form onSubmit={this.submitCreateBeverage} className='beverageCreateForm'>
                            <input name='beverageName' value={this.state.beverageName} onChange={this.handleChange} placeholder="Beverage Name" />
                            <input name='baseFlavor' value={this.state.baseFlavor} onChange={this.handleChange} placeholder="Base Flavor" />
                            <input name='secondaryFlavor' value={this.state.secondaryFlavor} onChange={this.handleChange} placeholder="Accent Flavor" />
                            <input name='waterType' value={this.state.waterType} onChange={this.handleChange} type='' placeholder="Water Type" />
                            <input name='extraFlavor' value={this.state.extraFlavor} onChange={this.handleChange} placeholder="Optional: Extra Flavor" />
                            <button type='submit'>Create</button>
                        </form>
                    </div>
                    <div className='creationCardRight'>
                        <h3>How this works</h3>
                        <p>Here you are able to pick flavors from our seasonal selection, to completely customize your own beverage and we can ship it to you!</p>
                        <p>First, Start by selecting your base flavor, this will be the main flavor component of your beverage.</p>
                        <p>Next, pick an accent flavor, this will be a more subtle flavor meant to complement the base flavor.</p>
                        <p>Then choose your style of the drink, bubbles or no bubbles, will this be a sparkling beverage or flat?</p>
                    </div>
                </div>
            </div>
        )
    }
}
