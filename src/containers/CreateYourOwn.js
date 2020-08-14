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

    render() {
        return (
            <div className='createBeveragePage'>
                <h2>How It Works</h2>
                  {this.state.modalShow ? 
                  <div><CreateBevModal show={this.state.modalShow} user={this.props.user} onHide={() => this.closeModal()}/> </div> 
                  : 
                  <BeverageInstructions show={this.state.modalShow} showModal={this.showModal} onHide={() => this.closeModal()}/> }
            </div>
        )
    }
}
