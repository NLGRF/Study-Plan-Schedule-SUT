import React, { Component } from 'react'
import * as firebase from 'firebase';
import {withRouter} from "react-router-dom";
import {get,ref } from '../config/firebase';
export default class MyConsole extends Component {
    constructor(){
        super();
        this.state={
            popup:false,
            name:'',
            detail:'',
            error:{},
            uid:'',
            todo:[]
        } 
       this.logOut =this.logOut.bind(this);
       this.Add_Table = this.Add_Table.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this); 
    }
componentDidMount(){
     let uid=[] 
     let todo=[]
     let key ='AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
     let userID
     let user = firebase.auth().currentUser; 
     userID =  JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
     this.setState({uid:userID.uid})
     //console.log(userID.uid)
     if(user||userID){
         let uid =  userID.uid;
         console.log(uid);
        get.ref().child(`users/${uid}/table/`).once('value',(snap)=>{
          snap.forEach(shot=>{
            let data= shot.val();
            let keyget= Object.keys(shot.val())
            console.log(data);
            todo.push({
                name:data.name,
                detail:data.detail
            }) 
          })
           
             this.setState({todo});
        })
     }else{
        
     }
    
}
logOut(){
    const main =this;
    firebase.auth().signOut().then(function() {
         main.props.history.push("/");
      }).catch(function(error) {
        
      });
}
deleteTable(name){
    let { uid } = this.state
      //console.log(name);
    const main = this;
    let todo=[]
    ref.child(`users/${uid}/table/${name}`).remove().then(()=>{
        console.log("Deleted")
        get.ref().child(`users/${uid}/table/`).once('value',(snap)=>{
            snap.forEach(shot=>{
              let data= shot.val();
              let keyget= Object.keys(shot.val())
              console.log(data);
              todo.push({
                  name:data.name,
                  detail:data.detail
              }) 
            })
              main.setState({todo});
          })
    })
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
    let todo=[];
    const  { uid } = this.state
    if(this.state.name==='')error.name = "Nane Tabe Don't have data";
    if(this.state.detail==='')error.detail = "Detail Don't have data";
    this.setState({error})
    const inVali  = Object.keys(error).length===0
    if(inVali){
        let data ={
            name:this.state.name,
            detail:this.state.detail
        }
        todo.push({
            name:data.name,
            detail:data.detail
        });
        ref.child(`users/${uid}/table/${data.name}/`).set({
            name:data.name,
            detail:data.detail
        }).then(()=>{
            this.setState({name:'',detail:'',popup:false});
        })
       //this.props.Uid("keng");
      //this.setState({done:true});
        //this.setState({popup:false})
        this.setState({todo:this.state.todo.concat(todo)});
    }
}
Add_Table(){
     this.setState({popup:true});
}
    render() {
     const {todo} = this.state
     console.log(todo);
      let  popup=(<div style={{marginLeft:50,marginRight:50}}>
                    <br/>
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
                                               placeholder="Name Table"/>
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
                                                placeholder="Detail"/>
                                        <span className="App-input-span">{this.state.error.detail}</span>
                                    </div>
                             </div>
                        </div>
                        </div>
                                    <div className="control" style={{textAlign:"right"}}>
                                       <a className="button is-success" onClick={this.handleSubmit}>Create</a>
                                    </div>
            </div>)
        return (
    <div style={{marginTop:10,marginLeft:50,marginRight:50}}>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-start">
                    <div className="navbar-item">
                      <div className="field is-grouped">
                          <p className="control">
                              <a className="button is-info" onClick={this.Add_Table}><b>+</b>  Add Table</a>
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
        {todo.map((d,idx)=>{
                   let boundClick = this.deleteTable.bind(this, (d.name));
                    return <div><br/><a   className="field is-grouped" 
                                            key={idx}  
                                            style={{marginLeft:250,marginRight:250,border:'solid 1px',display:'flex'}} >
                            <p className="control is-expanded">
                                 <div style={{marginLeft:5,color:'black'}}>
                                     <p><b>Name Tabe:&emsp;</b>{d.name}</p>
                                     <p><b>Detail:&emsp;&emsp;&emsp;&nbsp;</b> {d.detail}</p>
                                 </div>  
                            </p>
                                <p className="control">
                                <a className="button is-danger is-outlined" style={{marginTop:5,marginBottom:5,marginRight:5}}>
                                   <p style={{fontSize:15}} onClick={boundClick}>Delete</p> 
                                </a>
                            </p>
                       </a>
                       </div>
                })}
    </div>
        )
    }
}
