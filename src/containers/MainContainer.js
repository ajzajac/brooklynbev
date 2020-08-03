import React, { Component } from 'react'
import About from '../components/About'
import Beverages from '../components/Beverages'

export default class MainContainer extends Component {
    render() {
        return (
            <div>
                <Beverages />
                {/* <About /> */}
            </div>
        )
    }
}
