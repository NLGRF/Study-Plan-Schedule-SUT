import React, { Component } from 'react'
import {get} from '../config/firebase'
import HardTable from './HardTable.js'
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
                width: '40pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            },{
                width: '80pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            },
            {
                width: '120pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            },
            {
                width: '160pt',
                height: '40pt',
                float: 'left',
                'magin-left':'0px',
                'background-color': '#6699ff',
                'border-style': 'solid',
                'border-width': '2px',
            }
          ],
          row:[],
          data1:[
                 {Date: "จันทร์13:00-15:00B3103",Name: "INFORMATION SYSTEM "},
                 {Date: "จันทร์08:00-10:00B1211",Name: "COMPUTER STATISTICS"},
                 {Date: "จันทร์10:00-12:00B1211",Name: "Eng"},
        ],
} 
componentDidMount(){
    const main= this;
    get.ref().child('table').once('value',(snapshot)=>{
        let task=[]
            snapshot.forEach(shot => {
               //console.log(shot.val())
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
        //console.log(Mo,Tu,Fr,weight)
        this.setState({
            Mo:Mo,Tu:Tu,We:We,Th:Th,Fr:Fr,Sa:Sa,weight:weight
        })
    }).then(()=>{
         this.rowMo();
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
    console.log(this.state.data1.sort(compare));
    let row=[];let time1='',time2='';let deff=0;let sum ;let MO=[];let indexcss=0,indextime=0;
    this.state.data1.map((d,idx)=>{
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
            row.push(<div style={this.state.my[indexcss-1]} key={idx}><div>{d.Name}</div></div>);   
            time1='';sum=' '; deff=0; time2='';
    }); 
    //console.log(MO);
    let temp;
    // Math.floor(((MO[j])/10))>Math.floor((MO[j+1])/10)
    let index=0
    let i=0;
while(i<15){
for(let index=0;index<MO.length;index++){ 
    let math = Math.floor((MO[index])/10);
    let long  = parseInt(Math.floor(((MO[index])%10)));
        if(math===8){
            i+=long;
        }else if(math===10){
            i+=long;
        }else if(math===13){
            i+=long;
        }else{
            row.splice(i,0,<div className='list'><div></div></div>)
        }
    }
}
    row.splice(0,0,<div className='list'><div>Mon</div></div>)
    this.setState({row:row});  
    //   console.log(bands.sort(compare));
}
render() {
       const { task,row } = this.state
        return (
            <div className="MyTable">
                <HardTable/>
                <div className="headTable">{row}</div>
            </div>
        )
    }
}
