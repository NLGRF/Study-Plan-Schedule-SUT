import React, { Component } from 'react'
import { Link ,Redirect ,withRouter } from 'react-router-dom'
import classnames from 'classnames';
import * as firebase from 'firebase';
import { facebookProvider ,app} from '../../config/firebase'
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
        //this.authFacebook=this.authFacebook.bind(this);
      }
SingIn(){
       const main =this;
        const email = this.state.email;
        const password = this.state.pass;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              // [START_EXCLUDE]
              if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
                window.location = "/"
              } else {
                alert(errorMessage);
                window.location = "/"
              }
              console.log(error);
              return error
            }).then(()=>{
              this.setState({done:true})
            });
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
authFacebook(){
  const main =this;
  app.auth().signInWithPopup(facebookProvider)
  .then((user, error) => {
    if (error) {
      //this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
      console.log(error)
    } else {
      //this.props.setCurrentUser(user)
      console.log(user)
      main.setState({ done: true })
    }
  })
}
    render() {
      const form =(
        <div className='body'>
        <div className='login'>
            <form onSubmit={this.handleSubmit}>
            <h1 className="title is-3">Welcome</h1>
         <p className="subtitle is-5">Study Plan Schedule SUT</p>
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
           <input type="submit" className='button is-primary App-input-btn' value='Login' style={{width:200,fontWeight:'bold'}}/>
      </form>
        <p>
          <a class="button is-info" style={{width:200,marginTop:10}} onClick={this.authFacebook.bind(this)}><b>Login With Facebook</b></a>
        </p>
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
