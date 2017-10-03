import React, { Component } from 'react'
import classnames from 'classnames'
import {ref,get} from '../config/firebase'
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
            table:[]
        }
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
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
          error.user="Server error pls enter couse ID again !!! ><";
          main.setState({error})
      }
      setTimeout( function() {
          main.setState({
          infoStatus: 'loaded',
          couseID:''
        });
        }, 1000);
    return response.json();
  }).then((data)=>{
      //let G=data.Groups;
      //console.log(data)
     main.setState({
          Name:data.Name,
          Credit:data.Credit,
          Groups:data.Groups
      });
      let row=[]
      let todo=[]
      const {
            Name,
            Credit
        } = this.state
        let d =this.state.Groups;
        //console.log(d);
        var size = Object.keys(d).length;
        let G=1;
        if(d!==undefined){
        for(let i=1;i<=size;i++){
            for(let j=0;j<= Object.keys(d[i]).length;j++){ 
               //console.log(`key ${j}`,d[i][j]); 
               //console.log(Object.keys(d[i]).length)
               if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===4){ //3 
                   row.push(<div>
                               <div > 
                                                  <tr className="List_A" >
                                                      <td>Groups: {G}</td>
                                                      <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                      <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
                                                      <td>{d[i][j+2].Date}:{d[i][j+2].Time}=>{d[i][j+2].Room}</td>
                                                  </tr>
                               </div>
                           </div>
                           );
            todo.push({
                  Name: Name,
                  Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}=${d[i][j+2].Date}${d[i][j].Time}${d[i][j+2].Room}`.trim(),
                  Credit:Credit
             })
                           //console.log(j)
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
                          todo.push({
                              Name: Name,
                              Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`.trim(),
                              Credit:Credit
                          })
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
                todo.push({
                    Name: Name,
                    Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}`.trim(),
                    Credit:Credit
                });
               }
            }
            G++;
        }
        this.setState({row:row,todo:todo});
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
    let { todo } = this.state;
    table.push(todo[G]);
    this.setState({table:this.state.table.concat(table)})
    console.log(table);
    this.setState({todo:[],Name:'',Credit:''})
    ref.child('table').push(table[0]);
    //console.log("HHH",G);
}
componentDidMount() {
    get.ref().child('table').once('value',(snap)=>{
         snap.forEach((shot)=>{
             console.log(shot.val());
         })
    })
}
componentWillMount() { 
    this._getWeatherInfo();
  };
    render() { 
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
                        return <div className="button List_A" > <li  key={idx} onClick={boundClick}>Groups {idx+1} {d.Date}</li></div>
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
                    <input type="submit" value='Save' className="button is-info" />
                 </p>
                </form>
                <table className="table is-narrow">
                <tbody>
                    <br/>
                    {data}
                </tbody>
              </table>
            </div>
        )
    }
}
