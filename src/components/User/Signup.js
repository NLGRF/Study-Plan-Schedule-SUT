import React from 'react';
import classnames from 'classnames';
import {Link,Redirect} from 'react-router-dom';
import { ref ,firebaseAuth} from '../../config/firebase'
import * as firebase from 'firebase';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  uid:'',
                  user: '',
                  pass:'',
                  email:'',
                  study:'',
                  done:false,
                  error:{}
                  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
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
SignUp(){
   const email = this.state.email;
   const password = this.state.pass;
   const data ={
       study:this.state.study,
       pass:this.state.pass,
       users: this.state.user,
       email:this.state.email,
   }
  firebaseAuth.createUserWithEmailAndPassword(email, password).then((user)=>{
    ref.child(`users/${user.uid}/Profile/`)
   .set({
     email: email,
     username:data.users,
     study:data.study,
   })
   return user;
  }).then((user)=>{
     console.log(user.uid);
   }).then(()=>this.setState({done:true}))
  
}
 handleSubmit(event) {
    event.preventDefault();
    let error={};
    if(this.state.user==='')error.user = "Don't have data";
    if(this.state.pass==='')error.pass = "Don't have data";
    if(this.state.email==='')error.email = "Don't have data";
    if(this.state.study==='')error.study = "Don't have data";
    this.setState({error});
     const inVali  = Object.keys(error).length===0
    if(inVali){
      this.SignUp();
      
    }
  }
  render() {
    const form =(<div className='body'> 
          <div className='login'>
      <form onSubmit={this.handleSubmit}>
           <h1 className="title is-3">Sign Up Free</h1>
           <p className="subtitle is-5">Register Member SUT</p>
          <div className={classnames('field App-input', { error: !!this.state.error.user})}>
            <div className="control">
              <input type="text"
                     name="user"
                     value={this.state.user} 
                     className="input" 
                     placeholder='Username' 
                     onChange={this.handleChange}/>
                     <span className='App-input-span'>{this.state.error.user}</span>
            </div>
          </div>
          <div className={classnames('field App-input', { error: !!this.state.error.pass})}>
            <div className="control">
             <input type="email" 
                     name="email"
                     value={this.state.email}
                     className="input" 
                     placeholder='email' 
                     onChange={this.handleChange}/>
                     <span className='App-input-span'>{this.state.error.pass}</span>
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
          </div>
          <div className={classnames('field App-input', { error: !!this.state.error.pass})}>
            <div className="control">
             <input type="text" 
                     name="study"
                     value={this.state.study} 
                     className="input" 
                     placeholder='Study e.g EE CPE ..' 
                     onChange={this.handleChange}/>
                     <span className='App-input-span'>{this.state.error.pass}</span>
            </div>
          </div>
          <br/>
             <input type="submit" className='button is-primary App-input-btn' value='Create Account'/>
        </form>
          <u className='subtitle is-5' style={{fontSize:15}}><Link to ='/'>Cancel</Link></u>
          </div>
      </div>);
    return (
    <div>
      { this.state.done ? <Redirect to="/info" /> : form }
    </div>
    );
  }
}
export default  SignUp;
