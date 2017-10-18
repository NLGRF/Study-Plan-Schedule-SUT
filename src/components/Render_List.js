import React, { Component } from 'react'
import {tasksRef} from '../config/firebase'
export default class Render_list extends Component {
    state={
        done:true,
        delets:false,
        class:''
    }
toggleChecked = () => {
    const { key, checked } = this.props.task;
    tasksRef.child(key).update({ checked: !checked });
  };

toggleStarred = () => {
    const { key, starred } = this.props.task;
    tasksRef.child(key).update({ starred: !starred });
  };

deleteTask = () => {
    
    const { key } = this.props.task;
    console.log(this.props,key);
    this.setState({class:'is-loading'})
    setTimeout(()=> {
         tasksRef.child(`/${this.props.uid}/table/${this.props.table}/course/${key}`).remove().then(()=>{
              this.setState({done:false});
              this.setState({class:''})
         });
    }, 300);
    this.setState({done:true});
  };
  componentDidMount(){
      //console.log(this.props);
  }
  render() {
    //console.log(this.props.task)
    const { task } = this.props;
    let delets =(
        <div className={'is-loading'}></div>
    )
    let list =(
        <div>
            <br/>
                <div className="notification" style={{textAlign:'left'}}>
                <button className="delete" onClick={this.deleteTask}></button>
                <p><b>Name:</b>&emsp;{task.Name}</p>
                <p><b>Date:</b>&emsp;&nbsp; {task.Date}</p>
               </div>
         </div>)
    return (
        <div className={this.state.class}>
           {this.state.done ? list:delets}
        </div>
    );
  }
}