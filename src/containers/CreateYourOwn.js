import React, { Component } from 'react'

export default class CreateYourOwn extends Component {

    state = {
        beverageName: ''
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
            user_id: this.props.user.id
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
                <form onSubmit={this.submitCreateBeverage}>
                    <input name='beverageName' value={this.state.beverageName} onChange={this.handleChange} placeholder="Beverage Name" />
                    <button type='submit'>Create</button>
                </form>
            </div>
        )
    }
}
