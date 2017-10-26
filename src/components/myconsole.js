import React, { Component } from 'react'
import * as firebase from 'firebase';
import { withRouter, Redirect, Route } from "react-router-dom";
import { get, ref } from '../config/firebase';
import View_Table from './view'
import Modal from 'react-modal';
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
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
export default class MyConsole extends Component {
    constructor() {
        super();
        this.state = {
            popup: false,
            name: '',
            detail: '',
            error: {},
            uid: '',
            todo: [],
            taskLoading: true,
            modalIsOpen: false,
            Delete:false,
            _key:''
        }
        this.logOut = this.logOut.bind(this);
        this.Add_Table = this.Add_Table.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal =this.openModal.bind(this);
        this.deletTabled = this.deletTabled.bind(this)
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
          this.setState({ modalIsOpen: false });
          //this.setState({Deleted:false})
    }
    componentDidMount() {
        let uid = []
        let todo = []
        let key = 'AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
        let userID
        let user = firebase.auth().currentUser;
        userID = JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
        this.setState({ uid: userID.uid })
        //console.log(userID.uid)
        if (user || userID) {
            let uid = userID.uid;
            console.log(uid);
            // `User/${this.state.uid}/Tables/${this.props.table}/`
            get.ref().child(`User/${uid}/Tables/`).once('value', (snap) => {
                snap.forEach(shot => {
                    let data = shot.val();
                    let keyget = Object.keys(shot.val())
                    console.log(data);
                    todo.push({
                        name: data.name,
                        detail: data.detail
                    })
                })
                this.setState({ todo, taskLoading: false });
            })
        } else {

        }
    }
    logOut() {
        const main = this;
        firebase.auth().signOut().then(function () {
            main.props.history.push("/");
        }).catch(function (error) {

        });
    }
    deleteTable(name) {
        let { uid} = this.state
        console.log(name);
        this.setState({_key:name})
        const main = this;
        let todo = []
        //this.setState({ modalIsOpen: true });
        this.openModal();

    }
    deletTabled(){
      let { uid} = this.state
      //console.log(name);
      //this.setState({_key:name})
      const main = this;
      let todo = []
      console.log("DE")
      console.log(this.state._key)
      // `User/${this.state.uid}/Tables/${this.props.table}/`
      ref.child(`User/${this.state.uid}/Tables/${this.state._key}`).remove().then(() => {
          console.log("Deleted")
          //this.setState({ modalIsOpen: false });
          get.ref().child(`User/${uid}/Tables/`).once('value', (snap) => {
              snap.forEach(shot => {
                  let data = shot.val();
                  let keyget = Object.keys(shot.val())
                  console.log(data);
                  todo.push({
                      name: data.name,
                      detail: data.detail
                  })
              })
              main.setState({ todo });
             //main.closeModal();
          }).then(()=>{
            main.closeModal()
          })
      })
      //this.setState({Deleted:true})
      this.closeModal()
    }
    handleChange = (e) => {
        if (!!this.state.error[e.target.name]) {
            let error = Object.assign({}, this.state.error);
            delete error[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                error
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        let error = {};
        let todo = [];
        const { uid } = this.state
        if (this.state.name === '') error.name = "Name Tabe Don't have data";
        if (this.state.detail === '') error.detail = "Detail Don't have data";
        this.setState({ error })
        const inVali = Object.keys(error).length === 0
        if (inVali) {
            let data = {
                name: this.state.name,
                detail: this.state.detail
            }
            todo.push({
                name: data.name,
                detail: data.detail
            });
            ref.child(`User/${uid}/Tables/${data.name}/`).set({
                name: data.name,
                detail: data.detail
            }).then(() => {
                this.setState({ name: '', detail: '', popup: false });
            })
            this.setState({ todo: this.state.todo.concat(todo) });
        }
    }
    ShareTable(name) {
           this.props.history.push(`/share/${this.state.uid}/${name}`);
    }
    ViweTabe(name) {
        // console.log(name)
    this.props.history.push(`/user/view/tables/${name}`);

    }
    Add_Table() {
        this.setState({ popup: true });
    }
    render() {
        const { todo, taskLoading } = this.state
        let taskList;
        const appId="347460905704240";
        const urls =window.location.host
        console.log(urls)
        if (taskLoading) {
            taskList = <div className="title is-4">Loading...</div>;
        } else if (todo.length) {
            taskList = (
                <div>
                    {todo.map((d, idx) => {
                        let Share = this.ShareTable.bind(this, (d.name));
                        let boundClick = this.deleteTable.bind(this, (d.name));
                        let views = this.ViweTabe.bind(this, (d.name));
                        return (<div className="list-bar container" >
                            <br />
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title" >
                                        <p style={{ color: '#ff4d4d' }} >Name table:</p>&nbsp; {d.name}
                                    </p>
                                    <a href="#" class="card-header-icon" aria-label="more options">
                                        <span class="icon">
                                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                        <b>Detail:&nbsp;</b>{d.detail}
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <a class="card-footer-item" onClick={views}><i class="fa fa-cogs" aria-hidden="true" ></i><b>&nbsp;View</b></a>
                                    <a class="card-footer-item" onClick={Share} ><i className="fa fa-reply"></i>
                                    <FacebookShareButton url={`${urls}/share/${this.state.uid}/${d.name}`} appId={appId} >
                                        Share
                                    </FacebookShareButton>
                                    </a>
                                    {/* <a href={`http://google.com/${d.name}`} >share</a> */}

                                    <a class="card-footer-item" onClick={boundClick} ><i class="fa fa-times" aria-hidden="true"></i><b>&nbsp;Delete</b></a>
                                </footer>
                            </div>
                        </div>)
                    })}
                </div>
            )
        } else {
            taskList = <div className="title is-1">No Tasks</div>;
        }
        let popup = (<div style={{ marginLeft: 50, marginRight: 50 }}>
            <br />
            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label">Name Table</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="input"
                                name="name"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange}
                                placeholder="Name Table" />
                            <span className="App-input-span">{this.state.error.name}</span>
                        </div>
                    </div>
                </div>
                <div className="field-label">
                    <label className="label">Detail</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <input className="input"
                                type="text"
                                name="detail"
                                value={this.state.detail}
                                onChange={this.handleChange}
                                placeholder="Detail" />
                            <span className="App-input-span">{this.state.error.detail}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="control" style={{ textAlign: "right" }}>
                <a className="button is-success" onClick={this.handleSubmit}>Create</a>
            </div>
        </div>)
        //
        return (
            <div className='bar-go'>
                <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="button is-info" onClick={this.Add_Table}><i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add Table</a>
                                </p>
                            </div>
                        </div>
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <p className="title is-4">Study Plan schedule</p>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">
                                    <a className="button is-danger is-outlined" onClick={this.logOut}>Logout</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>
                {this.state.popup ? popup : ' '}
                <br />
                {taskList}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                <div style={{float:'center'}}>
                    <h1 className="title is-5">ต้องการลบตารางนี้!!!</h1>
                    <div>
                      <div className="field is-grouped is-grouped-centered">
                          <p className="control" style={{textAlign:'center'}}>
                              <a className="button is-primary has-text-centered" onClick={this.deletTabled}>
                                    Yes
                              </a>
                          </p>
                          <p className="control"  style={{textAlign:'center'}}>
                            <a className="button is-light" onClick={this.closeModal}>
                                  No
                            </a>
                          </p>
                      </div>
                    </div>
                  </div>
                </Modal>
            </div>
        )
    }
}
