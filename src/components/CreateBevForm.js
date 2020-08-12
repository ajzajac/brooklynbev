import React, { Component } from 'react'
import { useHistory } from 'react-router-dom'

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
                    <p>Try out a creation here!</p>
                        <form onSubmit={this.submitCreateBeverage} className='beverageCreateForm'>
                            <input name='beverageName'  autoFocus value={this.state.beverageName} onChange={this.handleChange} placeholder="Beverage Name" />
                            <input name='baseFlavor' value={this.state.baseFlavor} onChange={this.handleChange} placeholder="Base Flavor" />
                            <input name='secondaryFlavor' value={this.state.secondaryFlavor} onChange={this.handleChange} placeholder="Accent Flavor" />
                            <input name='waterType' value={this.state.waterType} onChange={this.handleChange} type='' placeholder="Water Type" />
                            <input name='extraFlavor' value={this.state.extraFlavor} onChange={this.handleChange} placeholder="Optional: Extra Flavor" />
                            <button type='submit'>Create!</button>
                        </form>
                    </div>
            </div>
        )
    }
}
