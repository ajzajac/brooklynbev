import React, { Component } from 'react';
import LoginModal from './LoginModal';

export default class Login extends Component {
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

    isLoggedIn = () => {
      return this.props
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
            this.props.history.push('./beverages')
          }
        })
    }

    sendUserBack = () => {
      window.history.go(-1)
    }

    render() {
        return (
            <div>
                <div className="input">
                  {this.state.showModal ? <LoginModal show={this.state.showModal} setUser={this.props.setUser} history={this.props.history} onHide={() => this.sendUserBack()}/> : null}
                </div>
            </div>
        )
    }
}