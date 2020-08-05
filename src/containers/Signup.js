import React, { Component } from 'react';

class Signup extends Component {
    state = {
        username: "",
        password: "",
        passwordConfirmation: "",
        email: "",
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()

        if(this.state.password === this.state.passwordConfirmation){
          fetch(`http://localhost:3000/signup`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.passwordConfirmation,
              email: this.state.email,
            })
          })
            .then(res => res.json())
            .then(response => {
              if (response.errors){
                alert(response.errors)
                this.setState({username: ''})
              } else {
                this.props.setUser(response.user)
                localStorage.token = response.token
                this.props.history.push('/beverages')
              }
            })
        } else {
          alert('Please Try Again.')
        }
      }

    render() {
        return (
            <div>
                 <div className="signupInput">
                    <h1>Create A New Account</h1>
                        <form className="auth-form" onSubmit={this.handleSubmit}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" className='input-field' />&nbsp;&nbsp;
                            <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" className='input-field' />&nbsp;&nbsp;
                            <input name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" className='input-field' type="password" />&nbsp;&nbsp;
                            <input name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} placeholder="Confirm Password" className='input-field' type="password" />&nbsp;&nbsp;
                            <button type="submit" className='input-field' >Signup</button>
                        </form>
                        <p>If you already have an account, <a href='/login'>log in here</a></p>
                </div>   
            </div>
        )
    }
}

export default Signup;