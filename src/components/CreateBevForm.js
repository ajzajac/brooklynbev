import React, { Component } from 'react'

export default class CreateBevForm extends Component {

    state = {
        beverageName: '',
        baseFlavor: '',
        secondaryFlavor: '',
        waterType: '',
        extraFlavor: '',
    }

    render() {
        return (
            <div classname="createBevFormModal">
                <p>Try out a creation here!</p>
                    <form onSubmit={this.submitCreateBeverage} className='beverageCreateForm'>
                        <input name='beverageName'  autofocus value={this.state.beverageName} onChange={this.handleChange} placeholder="Beverage Name" />
                        <input name='baseFlavor' value={this.state.baseFlavor} onChange={this.handleChange} placeholder="Base Flavor" />
                        <input name='secondaryFlavor' value={this.state.secondaryFlavor} onChange={this.handleChange} placeholder="Accent Flavor" />
                        <input name='waterType' value={this.state.waterType} onChange={this.handleChange} type='' placeholder="Water Type" />
                        <input name='extraFlavor' value={this.state.extraFlavor} onChange={this.handleChange} placeholder="Optional: Extra Flavor" />
                        <button type='submit'>Create</button>
                    </form>
            </div>
        )
    }
}
