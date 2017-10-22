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
            weight:0,
            my:[{
                width: '54.2pt',
                height: '40pt',
                float: 'left',
                'font-size':'65%',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            },{
                width: '108.4pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            },
            {
                width: '162.6pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            },
            {
                width: '216.8pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
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
          data1:[
                 {Date: "จันทร์16:00-18:00B3103",Name: "INFORMATION SYSTEM "},
                 {Date: "จันทร์08:00-10:00B1211",Name: "COMPUTER STATISTICS"},
                 {Date: "จันทร์10:00-11:00B1211",Name: "Eng"},
        ],
        view:false,
        datas:['Mon','Tue','Wed','Thu','Fri','Sat'],
        tasksLoading:true,
        uid:''
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
    ////console.log(this.props.uid)
    ////console.log(this.props)
    let key ='AIzaSyDCi-3V7lRDIsluMZ9fIHVt4oRDKQnxsfU'
    let userID
   // let user = firebase.auth().currentUser; 
    userID =  JSON.parse(localStorage.getItem(`firebase:authUser:${key}:[DEFAULT]`))
    this.setState({uid:userID.uid})
    //console.log(userID.uid)
    const {data1} =this.state
    const main= this;
    get.ref().child(`users/${userID.uid}/table/${this.props.table}/course/`).once('value',(snapshot)=>{
        let task=[]
            snapshot.forEach(shot => {
              // //console.log(shot.val())
               task.push({ ...shot.val()});
            });
               this.setState({ task:this.state.task.concat(task)});
    }).then(()=>{ 
        let Mo=[],Tu=[],We=[],Th=[],Fr=[],Sa=[];
        let weight=0;
        main.state.task.map((d,idx)=>{
            let checkDate =d.Date.split("=");
            weight+=parseInt(d.Credit[0]);
            for(let i=0;i<checkDate.length;i++){
                   if(checkDate[i][2]==='น'){
                       Mo.push({
                          Name:d.Name,
                           Date:checkDate[i],
                       });
                   }
                   else if(checkDate[i][2]==='ง'){
                      Tu.push({
                        Name:d.Name,
                        Date:checkDate[i]
                    });}
                    else if(checkDate[i][2]==='ธ'){
                        We.push({
                            Name:d.Name,
                          Date:checkDate[i]
                      });}
                    else if(checkDate[i][2]==='ห'){
                        Th.push({
                            Name:d.Name,
                          Date:checkDate[i]
                      });}
                    else if(checkDate[i][2]==='ก'){
                        Fr.push({
                            Name:d.Name,
                          Date:checkDate[i]
                      });}
                    else if(checkDate[i][2]==='า'){
                        Sa.push({
                            Name:d.Name,
                        Date:checkDate[i]
                     });
                   }
            }
            
        })
        //console.log(Mo,Tu,We,Th,Fr,weight)
        this.setState({
            Mo:Mo,Tu:Tu,We:We,Th:Th,Fr:Fr,Sa:Sa,weight:weight
        })
    }).then(()=>{
         this.rowMo();
         this.rowTu();
         this.rowWe();
         this.rowTh();
         this.rowFr();
         this.rowSa();
    }).then(()=>{
        this.setState({tasksLoading:false})
    });
}
rowMo(){
    function compare(a, b) {
        const genreA = a.Date;
        const genreB = b.Date;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Mo.sort(compare)
    let rowMo=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    this.state.Mo.map((d,idx)=>{
        for(let i=0;i<2;i++){
           }
            for(let i=6;i<8;i++){
                time1+=d.Date[i].trim();
            }
            for(let i=12;i<14;i++){
                time2+=d.Date[i].trim()
           }
           deff =Math.floor(time2-time1);
           sum=time1+deff;
           if(time1<10){
                MO=MO.concat(sum.substr(1));
                sum=sum.substr(1);
            }else{
                MO=MO.concat(sum)
            }
            indexcss=parseInt(sum)%10;
            ////console.log(time1=='08')
            if(time1=='08'){
                ////console.log(1)
                rowMo.push(<div style={{marginLeft:72.16}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='09'){
               // //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='10'){
                ////console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='11'){
                ////console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='13'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='14'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='15'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='16'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='17'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='18'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='19'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='20'){
                //console.log(2)
                rowMo.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else{
                //console.log(3)
                rowMo.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }  
            time1='';sum=' '; deff=0; time2='';
    }); 
    rowMo.splice(0,0,<div className='list2'><div>{this.state.datas[0]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowMo:rowMo});   
    //   //console.log(bands.sort(compare));
}
rowTu(){
    function compare(a, b) {
        const genreA = a.Date;
        const genreB = b.Date;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Tu.sort(compare)
    let rowTu=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    this.state.Tu.map((d,idx)=>{
        for(let i=0;i<2;i++){
           }
            for(let i=6;i<8;i++){
                time1+=d.Date[i].trim();
            }
            for(let i=12;i<14;i++){
                time2+=d.Date[i].trim()
           }
           deff =Math.floor(time2-time1);
           sum=time1+deff;
           if(time1<10){
                MO=MO.concat(sum.substr(1));
                sum=sum.substr(1);
            }else{
                MO=MO.concat(sum)
            }
            indexcss=parseInt(sum)%10;
            ////console.log(time1=='08')
            if(time1=='08'){
                //console.log(1)
                rowTu.push(<div style={{marginLeft:72.16}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='09'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='10'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='11'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='13'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='14'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='15'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='16'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='17'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='18'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='19'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='20'){
                //console.log(2)
                rowTu.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else{
                //console.log(3)
                rowTu.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }  
            time1='';sum=' '; deff=0; time2='';
    }); 
    rowTu.splice(0,0,<div className='list2'><div>{this.state.datas[1]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowTu:rowTu});   
    //   //console.log(bands.sort(compare));
}
rowWe(){
    function compare(a, b) {
        const genreA = a.Date;
        const genreB = b.Date;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.We.sort(compare)
    let rowWe=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    this.state.We.map((d,idx)=>{
        for(let i=0;i<2;i++){
           }
            for(let i=3;i<5;i++){
                time1+=d.Date[i].trim();
            }
            for(let i=9;i<11;i++){
                time2+=d.Date[i].trim()
           }
           deff =Math.floor(time2-time1);
           sum=time1+deff;
           if(time1<10){
                MO=MO.concat(sum.substr(1));
                sum=sum.substr(1);
            }else{
                MO=MO.concat(sum)
            }
            indexcss=parseInt(sum)%10;
            //console.log(time1,time2)
            if(time1=='08'){
                //console.log(1)
                rowWe.push(<div style={{marginLeft:72.16}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='09'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='10'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='11'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='13'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='14'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='15'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='16'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='17'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='18'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='19'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='20'){
                //console.log(2)
                rowWe.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else{
                //console.log(3)
                rowWe.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }  
            time1='';sum=' '; deff=0; time2='';
    }); 
    rowWe.splice(0,0,<div className='list2'><div>{this.state.datas[2]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowWe:rowWe});   
    //   //console.log(bands.sort(compare));
}
rowTh(){
    function compare(a, b) {
        const genreA = a.Date;
        const genreB = b.Date;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
    this.state.Th.sort(compare)
    let rowTh=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    this.state.Th.map((d,idx)=>{
        for(let i=0;i<2;i++){
           }
            for(let i=8;i<10;i++){
                time1+=d.Date[i].trim();
            }
            for(let i=14;i<16;i++){
                time2+=d.Date[i].trim()
           }
           deff =Math.floor(time2-time1);
           sum=time1+deff;
           if(time1<10){
                MO=MO.concat(sum.substr(1));
                sum=sum.substr(1);
            }else{
                MO=MO.concat(sum)
            }
            indexcss=parseInt(sum)%10;
           // console.log(time1,time2)
            if(time1=='08'){
                //console.log(1)
                rowTh.push(<div style={{marginLeft:72.16}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='09'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='10'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='11'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='13'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='14'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='15'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='16'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='17'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='18'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='19'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='20'){
                //console.log(2)
                rowTh.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else{
                //console.log(3)
                rowTh.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }  
            time1='';sum=' '; deff=0; time2='';
    }); 
    rowTh.splice(0,0,<div className='list2'><div>{this.state.datas[3]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowTh:rowTh});   
    //   //console.log(bands.sort(compare));
}
rowFr(){
    function compare(a, b) {
        const genreA = a.Date;
        const genreB = b.Date;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
   this.state.Fr.sort(compare)
    let rowFr=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    this.state.Fr.map((d,idx)=>{
        for(let i=0;i<2;i++){
           }
            for(let i=5;i<7;i++){
                time1+=d.Date[i].trim();
            }
            for(let i=11;i<13;i++){
                time2+=d.Date[i].trim()
           }
           deff =Math.floor(time2-time1);
           sum=time1+deff;
           if(time1<10){
                MO=MO.concat(sum.substr(1));
                sum=sum.substr(1);
            }else{
                MO=MO.concat(sum)
            }
            indexcss=parseInt(sum)%10;
            ////console.log(time1=='08')
            //console.log('hu',time1,indexcss)
            if(time1=='08'){
                //console.log(1)
                rowFr.push(<div style={{marginLeft:72.16}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='09'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='10'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='11'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='13'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='14'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='15'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='16'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='17'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='18'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='19'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='20'){
                //console.log(2)
                rowFr.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else{
                //console.log(3)
                rowFr.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }  
            time1='';sum=' '; deff=0; time2='';
    }); 
    rowFr.splice(0,0,<div className='list2'><div>{this.state.datas[4]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowFr:rowFr});   
    //   //console.log(bands.sort(compare));
}
rowSa(){
    function compare(a, b) {
        const genreA = a.Date;
        const genreB = b.Date;
        let comparison = 0;
        if (genreA > genreB) {
          comparison = 1;
        } else if (genreA < genreB) {
          comparison = -1;
        }
        return comparison;
      }
   this.state.Sa.sort(compare)
    let rowSa=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    let d=15;
    this.state.Sa.map((d,idx)=>{
        for(let i=0;i<2;i++){
           }
            for(let i=5;i<7;i++){
                time1+=d.Date[i].trim();
            }
            for(let i=11;i<13;i++){
                time2+=d.Date[i].trim()
           }
           deff =Math.floor(time2-time1);
           sum=time1+deff;
           if(time1<10){
                MO=MO.concat(sum.substr(1));
                sum=sum.substr(1);
            }else{
                MO=MO.concat(sum)
            }
            indexcss=parseInt(sum)%10;
            ////console.log(time1=='08')
            //console.log('hu',time1,indexcss)
            if(time1=='08'){
                //console.log(1)
                rowSa.push(<div style={{marginLeft:72.16}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='09'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*2}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='10'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*3}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }else if(time1=='11'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*4}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='13'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*6}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='14'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*7}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='15'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*8}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='16'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*9}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='17'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*10}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='18'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*11}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='19'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*12}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else if(time1=='20'){
                //console.log(2)
                rowSa.push(<div style={{marginLeft:72.16*13}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }
            else{
                //console.log(3)
                rowSa.push(<div style={{marginLeft:72.16*14}}><div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div></div>); 
            }  
            time1='';sum=' '; deff=0; time2='';
    }); 
    rowSa.splice(0,0,<div className='list2'><div>{this.state.datas[5]}</div></div>)
    ////console.log(rowMo.length)
    this.setState({rowSa:rowSa});   
    //   //console.log(bands.sort(compare));
}
render() {
       const { task,rowMo,rowTu ,rowWe,rowTh,rowFr,rowSa,Mo,tasksLoading} = this.state
        let taskList;
        if (tasksLoading) {
            taskList = <div className="title is-4">Loading...</div>;
          } else if (rowMo.length||rowTu.length||rowWe.length||rowTh.length||rowFr.length) {
              taskList =(<div className="MyTable">
                    <HardTable/>
                      <div className="headTable">{rowMo}</div>
                       <div className="headTable">{rowTu}</div>
                       <div className="headTable">{rowWe}</div>
                       <div className="headTable">{rowTh}</div>
                       <div className="headTable">{rowFr}</div>
                       <div className="headTable">{rowSa}</div>
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
