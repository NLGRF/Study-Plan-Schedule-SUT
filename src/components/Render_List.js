import React, { Component } from 'react'
import {tasksRef} from '../config/firebase'
import Tables from './Table'
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
export default class Render_list extends Component {
 constructor(){
     super();
    this.state={
        done:true,
        delets:false,
        class:'',
        uid:'',
        modalIsOpen:false
    }
    this.closeModal = this.closeModal.bind(this);
    this.deletTabled =this.deletTabled.bind(this);
 }

    openModal() {
        this.setState({modalIsOpen: true});
      }
      closeModal() {
        this.setState({modalIsOpen: false});
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
  //console.log(this.props,key);
    this.setState({class:'is-loading'})
    this.openModal();
    // setTimeout(()=> {
    //      tasksRef.child(`/${this.state.uid}/table/${this.props.table}/course/${key}`).remove().then(()=>{
    //           this.setState({done:false});
    //           this.setState({class:''})
    //      });
    // }, 300);
    // this.setState({done:true});
    // return <Tables up="je]"/>
  };
  componentDidMount(){
    let key ='AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
    let userID
    //let user = firebase.auth().currentUser;
    userID =  JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
    this.setState({uid:userID.uid})
      //console.log(this.props);
  }
  deletTabled(){
    const { key } =this.props.task
    console.log(key);
    this.setState({class:'is-loading'})
    //this.openModal();
    // `User/${this.state.uid}/Tables/${this.props.table}/Course/${this.state.couseID.trim()}/`
    setTimeout(()=> {
         tasksRef.child(`/${this.state.uid}/Tables/${this.props.table}/Course/${key}`).remove().then(()=>{
              this.setState({done:false});
              this.setState({class:''})
              this.closeModal()
         });
    }, 300);
    this.setState({done:true});

  }
  render() {
    console.log(this.props.task)
    const { task } = this.props;
    let times=" "
     task.time.map((time,idx)=>{
        times+=`${time.Date}:${time.Time} `
     })
     console.log(times)
    let delets =(
        <div className={'is-loading'}></div>
    )
    let list =(
        <div>
            <br/>
                <div className="notification" style={{textAlign:'left'}}>
                <button className="delete" onClick={this.deleteTask}></button>
                <p><b>Name:</b>&emsp;{task.name}</p>
                <p><b>Dates:</b>&emsp;{times}</p>
                <p><b>Group:</b>&emsp;{task.groups}</p>
               </div>
         </div>)
    return (
        <div className={this.state.class}>
           {this.state.done ? list:delets}
           <Modal
               isOpen={this.state.modalIsOpen}
               onAfterOpen={this.afterOpenModal}
               onRequestClose={this.closeModal}
               style={customStyles}
               contentLabel="Example Modal"
           >
           <div style={{float:'center'}}>
               <h1 className="title is-5">ต้องการลบรายวิชานี้!!!</h1>
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
    );
  }
}
