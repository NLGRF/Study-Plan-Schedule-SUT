import React, { Component } from 'react'
import classnames from 'classnames'
import {ref,get} from '../config/firebase'
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
export default class Add_input extends Component {
    constructor(){
        super();
        this.state={
            couseID:" ",
            error:{},
            Name:undefined,
            Credit:undefined,
            Groups:[],
            couse:'102108',
            todo:[],
            row:[],
            table:[],
            check:[],
            Dates:'',
            noif:'',
            uid:'',
            modalIsOpen: false
        }
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.closeModal =this.closeModal.bind(this);
}
handleChange(e){
    this.setState({todo:[],Name:'',Credit:''});
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
_getWeatherInfo = (id) => {
    const main = this;
    let query = null;
    main.setState({
        infoStatus: 'loading'
    });
 if(id!==''){
     query=id;
 }
  main.setState({
      infoStatus: 'loading'
  });
  fetch(`https://still-mountain-63520.herokuapp.com/api.php?id=${query}`)//103101 202109
  .then( function(response) {
    return response;
  })
  .then( function(response) {
      if(response.status===500){
          let error={};
          error.user="Enter couse ID again !!! ><";
          main.setState({error})
      }
      setTimeout( function() {
          main.setState({
          infoStatus: 'loaded',
        });
        }, 1000);
    return response.json();
  }).then((data)=>{
     main.setState({
          Name:data.Name,
          Credit:data.Credit,
          Groups:data.Groups
      });
      let row=[]
      let todo=[]
      let Dates='';
      let times=[]
      const {
            Name,
            Credit,
        } = this.state
        let d =this.state.Groups;
        console.log(d['1']);
        var size = Object.keys(d).length;
        let G=1;
        if(d!==undefined){
        for(let i=1;i<=size;i++){
            for(let j=0;j<= Object.keys(d[i]).length;j++){ 
               //console.log(`key ${j}`,d[i][j]); 
               //console.log(Object.keys(d[i]).length)
               if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===4){
                   console.log(d[i][j+2].Time) //3 
                   row.push(<div>
                               <div > 
                                                  <tr className="List_A" >
                                                      <td>Groups: {G}</td>
                                                      <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                      <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
                                                      <td>{d[i][j+2].Date}:{d[i][j].Time}=>{d[i][j+2].Room}</td>
                                                  </tr>
                               </div>
                           </div>
                       );
             times[0]=`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`
             times[1]=`${d[i][j+1].Date}${d[i][j+1].Time}${d[i][j+1].Room}`;
             times[2]=`${d[i][j+2].Date}${d[i][j+2].Time}${d[i][j+2].Room}`
            todo.push({
                  Course:id,
                  Name: Name,
                  Date:times,
                  Credit:Credit
             })
                Dates=`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}=${d[i][j+2].Date}${d[i][j+2].Time}${d[i][j+2].Room}`.trim()      //console.log(j)
                }
               else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===2){  //1
                  row.push(<div>
                                  <div>
                                                  <tr className="List_A"  >
                                                      <td>Groups: {G}</td>
                                                      <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                  </tr>
                                  </div>
                             </div>
                          );
                          times[0]=`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`
                          todo.push({
                              Course:id,
                              Name: Name,
                              Date:times,
                              Credit:Credit
                          })
                          Dates=`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`.trim()
                          //console.log(j)
               }
               else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===3){//2
                  row.push(<div>
                                  <div>
                                                  <tr className="button List_A" >
                                                      <td>Groups: {G}</td>
                                                      <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                      <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
                                                  </tr>
                                  </div>
                           </div>
              );
              //console.log(j)
              times[0]=`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`
              times[1]=`${d[i][j+1].Date}${d[i][j+1].Time}${d[i][j+1].Room}`;
                todo.push({
                    Course:id,
                    Name: Name,
                    Date:times,
                    Credit:Credit
                });
                Dates=`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j+1].Time}${d[i][j+1].Room}`.trim()
               }
            }
            G++;
        }
        this.setState({row:row,todo:todo,Dates:Dates});
      }
     todo=[];
  }).catch( function() {
      main.setState({
        infoStatus: 'error'
      });
  }); 
  
 }
handleSubmit(event) {
        event.preventDefault();
        let error={};
        if(!this.state.couseID) error.user = "Don't have data";
        this.setState({error});
       // alert("EROOR")
         const inVali  = Object.keys(error).length === 0
        if(inVali){
           //console.log(this.state.couseID.trim())
           this._getWeatherInfo(this.state.couseID.trim());   
         
        }else{
            console.log("Don't next,pls check you home")   
      } 
}
seletCouse=(G)=>{
    let table=[]
    let check=[];
    const that =this;
    let { todo,Dates,noif,Groups} = this.state;
    let Detail = Groups[G+1]['Detail']
    let time = delete  Groups[G+1]['Detail']
    console.log(Groups[G+1]);
    ref.child(`users/${this.state.uid}/table/${this.props.table}/course/${this.state.couseID.trim()}/`).set({
        name:this.state.Name,
        credit:this.state.Credit,
        groups:G+1,
        time: Groups[G+1],
        detail:Detail
    });
    console.log(this.state.check);
    setTimeout(()=>{
         that.setState({todo:[],Name:'',Credit:'',couseID:''})
    },300);
}
componentDidMount() {
    const data = this.props
    let key ='AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
    let userID
   // let user = firebase.auth().currentUser; 
   
    userID =  JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
    this.setState({uid:userID.uid})
    let check=[]
    get.ref().child(`users/${userID.uid}/table/${data.table}/course/`).once('value',(snap)=>{
         snap.forEach((shot)=>{
             console.log(shot.val().Date);
             check.push(shot.val().Date);
         });
    })
    this.setState({check})
}
componentWillMount() { 
   // this.seletCouse();
    this._getWeatherInfo();
  };
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
    render() {   
        //console.log(this.state.check);
        //console.log(this.state.table);
        const {
              Name,
              Credit,
              infoStatus,
              todo
          } = this.state
          let data = null;
          if (infoStatus === 'loaded'&&this.state.row.length>0) {
              data=<div><b>{Name}  - {Credit}</b>
                   {todo.map((d,idx)=>{
                       let boundClick = this.seletCouse.bind(this, (idx));
                        return <div className="field is-grouped" key={idx} >
                            <p className="control is-expanded">
                                 <div><b>Group</b> {idx+1} &nbsp;{d.Date+" "}</div>  
                            </p>
                                <p className="control">
                                <a className="button is-danger" onClick={boundClick} >
                                   <p style={{fontSize:15}}>Selete</p> 
                                </a>
                            </p>
                    </div>
                   })}
                    </div>
          } else if (infoStatus === 'loading') {
            data = <div>
                         <b>Loading data...</b>
                  </div>
          } else if (infoStatus === 'error') {
            data = <div className="info error">{this.state.error.user}</div>
          }
        return (
            <div>
                 <form className="field is-grouped " onSubmit={this.handleSubmit} >
                  <p className={classnames('control is-expanded',{error:!!this.state.error.user})}>
                    <input className="input" type="text" 
                     placeholder="Enter couse ID" 
                     onChange={this.handleChange}
                     value={this.state.couseID}
                     name='couseID'
                    />
                    <span style={{color:'red'}}>{this.state.error.user}</span>
                  </p>
                  <p className="control">
                    <input type="submit" value='Search' className="button is-danger" />
                 </p>
                </form>
                <table className="table is-narrow">
                <tbody>
                    <br/>
                    {data}
                </tbody>
              </table>
              <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
            >
                <h1 className="title is-5">{this.state.noif}</h1>
                <div style={{textAlign:'center'}}><button onClick={this.closeModal} className='button is-danger'>Close</button></div>
          </Modal>
            </div>
        )
    }
}
