import React, { Component } from 'react'

export default class Signup extends Component {

    state = {
        username: "",
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleSubmit = (e) => {
        e.preventDefault()
  
        
          fetch(`http://localhost:3000/signup`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json"
            },
            body: JSON.stringify({
              name: this.state.username,
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
                // this.props.history.push('/')
              }
            })
        } 
      


    render() {
        return (
            <div>
                 <div className="signupInput">
                    <h1>Sign Up</h1>
                        <form className="auth-form" onSubmit={this.handleSubmit}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" className='input-field' />&nbsp;&nbsp;
                            <button type="submit" className='input-field' >Signup</button>
                        </form>
                        <p>Already have an account? <a href='/login'>Login Here</a></p>
                </div>   
            </div>
        )
    }
}
