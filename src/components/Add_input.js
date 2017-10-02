import React, { Component } from 'react'
import classnames from 'classnames'
import List_table from './List_table'
export default class Add_input extends Component {
    constructor(){
        super();
        this.state={
            couseID:" ",
            error:{},
        }
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
}
handleChange(e){
    if (!!this.state.error.user) {
      let error = Object.assign({}, this.state.error);
      delete error[e.target.name];
      this.setState({
        [e.target.name]: e.target.value,
        error:''
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
} 
    textOnchange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        let error={};
        if(!this.state.couseID) error.user = "Don't have data";
        this.setState({error});
       // alert("EROOR")
         const inVali  = Object.keys(error).length === 0
        if(inVali){
           this.setState({couseID:this.state.couseID.trim()});
           console.log(this.state.couseID)
        }else{
            console.log("Don't next,pls check you home")   
      }
    }
    render() {
        console.log(this.state.couseID)
        return (
            <div>
                 <form className="field is-grouped " onSubmit={this.handleSubmit} >
                  <p className={classnames('control is-expanded',{error:!!this.state.error.user})}>
                    <input className="input" type="text" 
                     placeholder="รายชื่อวิชา" 
                     onChange={this.handleChange}
                     value={this.state.couseID}
                     name='couseID'
                    />
                    <span style={{color:'red'}}>{this.state.error.user}</span>
                  </p>
                  <p className="control">
                    <input type="submit" value='Save' className="button is-info" />
                 </p>
                </form>
               <List_table id={this.state.couseID}/>
            </div>
        )
    }
}
