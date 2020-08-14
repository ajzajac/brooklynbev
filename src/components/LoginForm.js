import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export default class LoginForm extends Component {

    state = {
        username: "",
        password: "",
        showModal: true,
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    handleSubmit = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
          },
          body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
          if (response.errors){
            alert(response.errors)
          } else {
            this.props.setUser(response.user)
            localStorage.token = response.token
           this.props.history.push('./Beverages')
          }
        })
    }
    
    render() {
        return (
            <div className='loginForm'>
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <input autoFocus name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" className='input-field'  /> &nbsp;
                    <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" className='input-field' type="password" />&nbsp;&nbsp;
                    <Button type="submit" className='input-field'>Login</Button>
                </form>
            </div>
        )
    }
}
