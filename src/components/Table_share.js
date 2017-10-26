import React, { Component } from 'react'
import {get} from '../config/firebase'
import HardTable from './HardTable.js'
import Add_List from './Add_List'
import Render_list from './Render_List'
export default class Tables extends Component {
    state={
            task:[],
            Mo:[],
            Tu:[],
            We:[],
            Th:[],
            Fr:[],
            Sa:[],
            Su:[],
            weight:0,
            my:[{
                width: '54.2pt',
                height: '40pt',
                float: 'left',
                'font-size':'65%',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },{
                width: '108.4pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '162.6pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '216.8pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
              {
                width: '271.0pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '325.2pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                maginLeft:40,
            }
          ],
          half:[{
                width: '79.2pt',
                height: '40pt',
                float: 'left',
                'font-size':'65%',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },{
                width: '132.4pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '187.6pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '241.8pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '296.0pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                width: '350.2pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '1px',
                'border-color':'#FFFFFF'
            },
            {
                maginLeft:40,
            }

           ],
          rowMo:[],
          rowTu:[],
          rowWe:[],
          rowTh:[],
          rowFr:[],
          rowSa:[],
          rowSu:[],
          data1:[
                 {Time: "16:00-18:00",Name: "INFORMATION SYSTEM "},
                 {Time: "08:00-10:00",Name: "COMPUTER STATISTICS"},
                 {Time: "10:00-11:00",Name: "Eng"},
        ],
        view:false,
        datas:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        tasksLoading:true,
        uid:'',
        table:''
}
View_list(){
    this.setState({view:true});
    //this.setState({tasksLoading:true})
}
componentDidMount() {
    this.rederData();
}
rederData(){
    const data = this.props
    console.log(data)
    this.setState({table:data.table})
    //console.log(this.props.uid)
    //console.log(this.props)
    //let table ="Hello"
    let key ='AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
    let userID
   //let user = firebase.auth().currentUser;
    userID =  JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
    this.setState({uid:userID.uid})
    console.log(userID,this.props.table)
    let Mo=[],Tu=[],We=[],Th=[],Fr=[],Sa=[],Su=[];
    const {data1} =this.state
    const main= this;
    //console.log(userID.uid,userID)
    // `User/${this.state.uid}/Tables/${this.props.table}/Course/${this.state.couseID.trim()}/`
    let weight=0;
    get.ref().child(`User/${this.props.data.uid}/Tables/${this.props.data.table}/Course/`).once('value',(snapshot)=>{
        let task=[]
            snapshot.forEach(shot => {
               console.log(shot.val())
               task.push({ ...shot.val()});
            });
               this.setState({ task:this.state.task.concat(task)});
      }).then(()=>{
         console.log(main.state.task)
         let times=[]
         main.state.task.map((data,dataid)=>{
              //times.push(data.time);
              console.log(data.credit[0])
              weight+=parseInt(data.credit[0]);
              data.time.map((d,dix)=>{
                  //console.log(data.name)
                  //console.log(d.Date[2])
                  if(d.Date[2]==='น'){
                    Mo.push({
                       Name:data.name,
                       Time:d.Time,
                    });
                }
                else if(d.Date[2]==='ง'){
                   Tu.push({
                     Name:data.name,
                     Time:d.Time
                 });}
                 else if(d.Date[2]==='ธ'){
                     We.push({
                         Name:data.name,
                         Time:d.Time
                   });}
                 else if(d.Date[2]==='ห'){
                     Th.push({
                         Name:data.name,
                         Time:d.Time
                   });}
                 else if(d.Date[2]==='ก'){
                     Fr.push({
                         Name:data.name,
                         Time:d.Time
                   });}
                 else if(d.Date[2]==='า'){
                     Sa.push({
                         Name:data.name,
                         Time:d.Time
                  })
                }
                else if(d.Date[2]==='ท'){
                    Su.push({
                        Name:data.name,
                        Time:d.Time
                 })
               }
              })
         })
         //console.log(times)
        console.log(weight)
        this.setState({
            Mo:Mo,Tu:Tu,We:We,Th:Th,Fr:Fr,Sa:Sa,weight:weight,Su:Su
        })
    }).then(()=>{
         this.rowMo();
         this.rowTu();
         this.rowWe();
        this.rowTh();
         this.rowFr();
         this.rowSa();
         this.rowSu();
    }).then(()=>{
        this.setState({tasksLoading:false})
    });
}
rowMo(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Mo.sort(compare)
    let rowMo=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.Mo.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
           let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowMo.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowMo.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowMo.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowMo.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowMo.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowMo.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowMo.splice(0,0,<div className='list2'><div>{this.state.datas[0]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowMo:rowMo});
    //   //console.log(bands.sort(compare));
}
rowTu(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Tu.sort(compare)
    let rowTu=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.Tu.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
          let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowTu.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowTu.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowTu.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowTu.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowTu.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowTu.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowTu.splice(0,0,<div className='list2'><div>{this.state.datas[1]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowTu:rowTu});
    //   //console.log(bands.sort(compare));
}
rowWe(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.We.sort(compare)
    let rowWe=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.We.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
           let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowWe.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowWe.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowWe.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowWe.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowWe.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowWe.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowWe.splice(0,0,<div className='list2'><div>{this.state.datas[2]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowWe:rowWe});
    //   //console.log(bands.sort(compare));
}
rowTh(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Th.sort(compare)
    let rowTh=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.Th.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
                   let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowTh.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowTh.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowTh.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowTh.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowTh.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowTh.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowTh.splice(0,0,<div className='list2'><div>{this.state.datas[3]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowTh:rowTh});
    //   //console.log(bands.sort(compare));
    //   //console.log(bands.sort(compare));
}
rowFr(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Fr.sort(compare)
    let rowFr=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.Fr.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
                            let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowFr.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowFr.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowFr.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowFr.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowFr.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowFr.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowFr.splice(0,0,<div className='list2'><div>{this.state.datas[4]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowFr:rowFr});
    //   //console.log(bands.sort(compare));
}
rowSa(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Sa.sort(compare)
    let rowSa=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.Sa.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
                                     let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowSa.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowSa.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowSa.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowSa.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowSa.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowSa.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowSa.splice(0,0,<div className='list2'><div>{this.state.datas[5]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowSa:rowSa});
    //   //console.log(bands.sort(compare));
}
rowSu(){
    function compare(a, b) {
        const genreA = a.Time;
        const genreB = b.Time;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Su.sort(compare)
    let rowSu=[];let x='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    let times=[]
    this.state.Su.map((d,idx)=>{
           let x =d.Time.split('-')[0].split(':')[0]
           let y =d.Time.split('-')[1].split(':')[0]
                                   let half =d.Time.split('-')[1].split(':')[1]
          // console.log(z>0)
    if(half=='00'){
        if(x=='08'){
            ////console.log(1)
            rowSu.push(<div style={{marginLeft:72.16}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowSu.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
      else{
         if(x=='08'){
            ////console.log(1)
            rowSu.push(<div style={{marginLeft:72.16*1}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='09'){
           // //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*2}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='10'){
            ////console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*3}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }else if(x=='11'){
            ////console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*4}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='13'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*6}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='14'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*7}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='15'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*8}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='16'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*9}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='17'){
            //console.log(2)
            //12.51
            rowSu.push(<div style={{marginLeft:72.16*10}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='18'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*11}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='19'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*12}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else if(x=='20'){
            //console.log(2)
            rowSu.push(<div style={{marginLeft:72.16*13}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
        else{
            //console.log(3)
            rowSu.push(<div style={{marginLeft:72.16*14}}><div style={this.state.half[y-x-1]} key={idx}><div>{d.Name}</div></div></div>);
        }
      }
    });
    rowSu.splice(0,0,<div className='list2'><div>{this.state.datas[6]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowSu:rowSu});
    //   //console.log(bands.sort(compare));
}
render() {
       const { task,rowMo,rowTu ,rowWe,rowTh,rowFr,rowSa,rowSu,Mo,tasksLoading} = this.state
        let taskList;
        if (tasksLoading) {
            taskList = <div className="title is-4">Loading...</div>;
          } else if (rowMo.length||rowTu.length||rowWe.length||rowTh.length||rowFr.length||rowSu.length) {
              taskList =(<div className="MyTable">
                    <HardTable/>
                      <div><div className="headTable">{rowMo}</div></div>
                      <div><div className="headTable">{rowTu}</div></div>
                      <div><div className="headTable">{rowWe}</div></div>
                      <div><div className="headTable">{rowTh}</div></div>
                      <div><div className="headTable">{rowFr}</div></div>
                      <div><div className="headTable">{rowSa}</div></div>
                      <div><div className="headTable">{rowSu}</div></div>

                       <br/>
                       <h1 className="title is-5">จำนวนหน่วยกิต: {this.state.weight}</h1>
                       <a class="button is-primary is-outlined" onClick={this.View_list.bind(this)}>List Course</a>
                       {this.state.view ? <Add_List uid={this.props.uid} table={this.props.table} />:''}
                   </div>)
          } else {
            taskList = <div className="title is-1">No Course</div>;
          }
          return taskList;
    }
}
