import React, { Component } from 'react'
import {get} from '../config/firebase';
import Render_List  from  './Render_List'
export default class Add_list extends Component {
   constructor(){
       super();
       this.state={
        task:[],
        tasksLoading: true,
       }
   }
componentDidMount(){
    //console.log(this.props)
    get.ref().child(`users/${this.props.uid}/table/${this.props.table}/course/`).once('value',(snapshot)=>{
        let task=[]
        snapshot.forEach(shot => {
           //console.log(shot.val())
           task.push({ ...shot.val(), key: shot.key });
        });
        this.setState({ task:this.state.task.concat(task),tasksLoading: false});
      });
       this.forceUpdate();
}
    render() {
        const { task ,tasksLoading } = this.state
        //console.log(task)
        let taskList;
        if (tasksLoading) {
            taskList = <div className="title is-4">Loading...</div>;
          } else if (task.length) {
              taskList =(<ul>
                    <h1 className='title is-3'>Course List</h1>
                    {this.state.task.map(task => (
                      <Render_List key={task.key} task={task} uid={this.props.uid} table={this.props.table} />
                    ))}
                    </ul>)
          } else {
            taskList = <div className="title is-1">No Tasks</div>;
          }
          return taskList;
    }
}
