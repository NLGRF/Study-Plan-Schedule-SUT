import React, { Component } from 'react'

export default class Share_table extends Component {
    componentDidMount(){
        const data = this.props.match
        console.log(data)
        const urls =window.location.host
        console.log(urls)
    }
    render() {
        return (
            <div>
                Hello Share
            </div>
        )
    }
}
