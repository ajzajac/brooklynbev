import React, { Component } from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


export default class CreateBevForm extends Component {

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
                window.location.href='/beverages'
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
            <div className="createBevFormModal">
                <div className='bevForm'>
                        <form onSubmit={this.submitCreateBeverage} className='beverageCreateForm'>
                            <p>Give it a name:</p>
                            <input name='beverageName'  autoFocus value={this.state.beverageName} onChange={this.handleChange} placeholder="Beverage Name" />
                            <p>Pick the main flavor:</p>
                            <input name='baseFlavor' value={this.state.baseFlavor} onChange={this.handleChange} placeholder="Base Flavor" />
                            <p>Pick your accent flavor:</p>
                            <input name='secondaryFlavor' value={this.state.secondaryFlavor} onChange={this.handleChange} placeholder="Accent Flavor" />
                            <p>Add an extra flavor if you'd like:</p>
                            <input name='extraFlavor' value={this.state.extraFlavor} onChange={this.handleChange} placeholder="Optional: Extra Flavor" /> 
                               <p>Choose the water type for the beverage:</p>
                               <ToggleButtonGroup type="checkbox" name="waterType" value={this.state.waterType} style={{marginBottom: '8%'}}>
                                    <ToggleButton variant='secondary' name='waterType' value='Flat' onChange={this.handleChange}>Flat</ToggleButton>
                                    <ToggleButton variant='secondary' name='waterType' value='Sparkling' onChange={this.handleChange}>Sparkling</ToggleButton>
                                </ToggleButtonGroup>
                                
                            <Button  size='lg' variant='primary' type='submit'>Create!</Button>
                        </form>
                    </div>
            </div>
        )
    }
}
