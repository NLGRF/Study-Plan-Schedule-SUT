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
    setTimeout(()=> {
         tasksRef.child(`/${this.state.uid}/table/${this.props.table}/course/${key}`).remove().then(()=>{
              this.setState({done:false});
              this.setState({class:''})
         });
    }, 300);
    this.setState({done:true});
    return <Tables up="je]"/>
  };
  componentDidMount(){
    let key ='AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
    let userID
    //let user = firebase.auth().currentUser; 
    userID =  JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
    this.setState({uid:userID.uid})
      //console.log(this.props);
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
                <h1 className="title is-5">Deleted!!!</h1>
                <div style={{textAlign:'center'}}><button onClick={this.closeModal} className='button is-danger'>Close</button></div>
          </Modal>
        </div>
    );
  }
}