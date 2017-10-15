import React, { Component } from 'react'
import Tables from './Table'
import * as firebase from 'firebase';
import Add_input from './Add_input'
export default class Viwe_Table extends Component {
constructor(){
    super()
    this.state={
          table:'',
          uid:'',
          done:false,
          view:true,
          list:false,
    }
    this.MyTable_onClick = this.MyTable_onClick.bind(this)
    this.Add_Course_onClick =this.Add_Course_onClick.bind(this)
    this.logOut =this.logOut.bind(this)
}
componentDidMount(){
    const {done,uid,table} =this.state
    const data = this.props.match.params
    this.setState({
         table:data.table,
         uid:data.uid,
         done:true,           
     });
    //console.log(data.uid,data.table);
}
logOut(){
    const main =this;
    firebase.auth().signOut().then(function() {
         main.props.history.push("/");
      }).catch(function(error) {
        
      });
}
MyTable_onClick(){
    this.setState({view:true})
}
Add_Course_onClick(){
    this.setState({view:false})
}
    render() {
         let MyTable =(
             <div className="container" >
                 <br/>
                 <Tables uid={this.state.uid} table={this.state.table}/>
             </div>
         )
        return (
    <div className='bar-go containaer'>
            <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-start">
                    <div className="navbar-item">
                      <div className="field is-grouped">
                          <p className="control">
                              <a className="button is-warning" onClick={this.MyTable_onClick} ><b>My Table</b></a>
                          </p>
                      </div>
                    </div>
                    <div className="navbar-item">
                      <div className="field is-grouped">
                          <p className="control">
                              <a className="button is-info"  onClick={this.Add_Course_onClick}><b>+</b>  Add Course</a>
                          </p>
                      </div>
                    </div>
                    <div className="navbar-item">
                      <div className="field is-grouped">
                          <p className="control">
                             <p className="title is-4">Table Nane:&nbsp;&nbsp;<b style={{color:'#ffffff'}}>{this.state.table}</b></p>
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
             {this.state.view ? MyTable : <div className="container">
                                            <br/>
                                             <Add_input uid={this.state.uid} table={this.state.table} />
                                            </div>}
    </div>
        )
    }
}
