import React, { Component } from 'react'
import Table_share from './Table_share'
import {
    ShareButtons,
    ShareCounts,
    generateShareIcon
} from 'react-share';
const {
    FacebookShareButton,
  } = ShareButtons;
const {
    FacebookShareCount,
  } = ShareCounts;
export default class Share_table extends Component {
    constructor() {
        super();
        this.state = {
            uid: '',
            table: '',
        }
    }
    componentDidMount() {
        const data = this.props.match.params
        console.log(data.uid)
        const urls =window.location.host
        console.log(urls)
        this.setState({ uid: data.uid, table: data.table })
    }
    render() {
        const { uid, table } = this.state
        console.log(uid, table)
        let url = `https://google.com`;
        const appId="347460905704240";
        return (
            <div className="container" style={{marginTop:10}}>
                 <i className="fa fa-rocket" aria-hidden="true"></i>
                <div className="title is-4">Schedule Name:&nbsp;<b>{this.state.table}</b></div>
                <Table_share data={this.props.match.params} />
                {/* <FacebookShareButton url={url} appId={appId} >
                    Share
                </FacebookShareButton> */}
            </div>
        )
    }
}
