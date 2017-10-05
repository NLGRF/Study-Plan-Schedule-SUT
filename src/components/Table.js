import React, { Component } from 'react'
import {get} from '../config/firebase'
import HardTable from './HardTable.js'
export default class Tables extends Component {
    constructor(){
        super();
        this.state={
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
          data1:[{Date: "จันทร์08:00-10:00B1211",Name: "COMPUTER STATISTICS"},
                 {Date: "จันทร์13:00-15:00B3103",Name: "INFORMATION SYSTEM DESIGN AND DEVELOPMENT"},
        ],
        } 
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
        console.log(Mo,Tu,Fr,weight)
        this.setState({
            Mo:Mo,Tu:Tu,We:We,Th:Th,Fr:Fr,Sa:Sa,weight:weight
        })
    }).then(()=>{
         this.rowMo();
    });
}
rowMo(){
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
       //this.setState({Mon:this.state.Mon.push(MO)})
    let temp;
    //console.log(row);
    console.log(MO);
    for(let i=0;i<MO.length;i++){
        for(let j=0;j<MO.length-1;j++){
              if(Math.floor(((MO[j])/10))>Math.floor((MO[j+1])/10)){
                  temp=row[j]
                  row[j]=row[j+1];
                  row[j+1]=temp
              }
          }
      } 
    // row.splice(0,0,<div className='list'><div>Mon</div></div>)
    //   var arr = ['One', 'Two', 'Three'];
    //   arr.splice(0, 0, "Zero"); //ระบุ parameter 2 เป็น 1 จะเท่ากับการ Replace 0 = add 2 = delete
    //   console.log(arr);
    //console.log(row[1]);
    this.setState({row:row});
}
render() {
       const { task,row } = this.state
        return (
            <div>
                <HardTable/>
                <div className="headTable">{row}</div>
            </div>
        )
    }
}
