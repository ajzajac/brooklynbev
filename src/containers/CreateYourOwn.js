import React, { Component } from 'react'
import CreateBevModal from '../components/CreateBevModal'
import BeverageInstructions from '../components/BeverageInstructions'


export default class CreateYourOwn extends Component {
    

    state = {
        beverageName: '',
        baseFlavor: '',
        secondaryFlavor: '',
        waterType: '',
        extraFlavor: '',
        modalShow: false,
    }

    showModal = () => {
        this.setState({
            modalShow: true
        })
    }
    
    closeModal = () => {
        this.setState({
            modalShow: false
        })
    }

    onClickOutside = () => {
        if(this.state.modalShow){
            this.closeModal()
        }
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
                  {this.state.modalShow ? <div><CreateBevModal show={this.state.modalShow} onHide={() => this.closeModal()}/> </div> : <BeverageInstructions show={this.state.modalShow} showModal={this.showModal} onHide={() => this.closeModal()}/> }
            </div>
        )
    }
}
