import React, { Component } from 'react'
import { Link ,Redirect } from 'react-router-dom'
import classnames from 'classnames';
import * as firebase from 'firebase';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '',
                      pass:'',
                      error:{},
                      done:false
                      };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
      }
SingIn(){
        const email = this.state.email;
        const password = this.state.pass;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            }).then(()=>{
              var user = firebase.auth().currentUser;
              if (user) {
                 console.log(user.uid);
                 //this.props.Uid(user.uid);
              } else {
                // No user is signed in.
              }
            }).then(()=>this.setState({done:true}));
      }
   handleChange=(e)=>{
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
        let error={};
        if(this.state.user==='')error.email = "Username Don't have data";
        if(this.state.pass==='')error.pass = "Password Don't have data";
        this.setState({error})
        const inVali  = Object.keys(error).length===0
        if(inVali){
          this.SingIn();
           //this.props.Uid("keng");
          //this.setState({done:true});
        }
}
    render() {
      const form =(
        <div className='body'> 
        <div className='login'>
            <form onSubmit={this.handleSubmit}>
            <h1 className="title is-3">Welcome</h1>
         <p className="subtitle is-5">Register Member SUT</p>
        <div className={classnames('field App-input', { error: !!this.state.error.user})}>
          <div className="control">
            <input type="email"
                   name="email"
                   value={this.state.user} 
                   className="input" 
                   placeholder='Email' 
                   onChange={this.handleChange}/>
                   <span className='App-input-span'>{this.state.error.user}</span>
          </div>
        </div>
        <div className={classnames('field App-input', { error: !!this.state.error.pass})}>
          <div className="control">
           <input type="password" 
                   name="pass"
                   value={this.state.pass} 
                   className="input" 
                   placeholder='Password' 
                   onChange={this.handleChange}/>
                   <span className='App-input-span'>{this.state.error.pass}</span>
          </div>
          <br/>
        </div>
           <input type="submit" className='button is-primary App-input-btn' value='Login'/>
      </form>
        <u className='subtitle is-5' style={{fontSize:15}}><Link to ='/signup'>Create account</Link></u>
        </div>
    </div>
      )
        return (
         <div>
           {this.state.done ? <Redirect to="/user/console" /> : form }    
          </div>
        )
    }
}
