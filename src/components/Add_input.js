import React, { Component } from 'react'
import classnames from 'classnames'
import List_table from './List_table'
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
        }
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.seletCouse = this.seletCouse.bind(this);
}
static defaultProps = {
    id: '523101',
  };
handleChange(e){
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
    textOnchange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
_getWeatherInfo = (id) => {
    const main = this;
    let query = null;
    main.setState({
        infoStatus: 'loading'
    });
if (!id || id == '') {
      query = this.props.id;
    } else {
      query = id;
    }
  main.setState({
      infoStatus: 'loading'
  });
  fetch(`https://still-mountain-63520.herokuapp.com/api.php?id=${query}`)//103101 202109
  .then( function(response) {
    return response;
    //console.log(response);
  })
  .then( function(response) {
      if(response.status!==200){
          let error={};
          error.user="Don,t have Couse ID";
          main.setState({error})
      }
      setTimeout( function() {
          main.setState({
          infoStatus: 'loaded'
        });
        }, 1000);
    return response.json();
  }).then((data)=>{
      let G=data.Groups;
      //console.log(data)
     main.setState({
          Name:data.Name,
          Credit:data.Credit,
          Groups:data.Groups
      });
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
           //console.log("JJ")
           this._getWeatherInfo(this.state.couseID); 
           this.setState({couseID:''})
        }else{
            console.log("Don't next,pls check you home")   
      }
      let row=[]
      let todo=[]
      const {
            Name,
            Credit,
            Groups,
            infoStatus,
        } = this.state
        let d =this.state.Groups;
        //console.log(d);
        var size = Object.keys(d).length;
        let G=1;
        if(d!==undefined){
        for(let i=1;i<=size;i++){
            for(let j=0;j<= Object.keys(d[i]).length;j++){ 
               //console.log(`key ${j}`,d[i][j]); 
              // console.log(Object.keys(d[i]).length)
               if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===4){ //3 
                   row.push(<div>
                               <div onClick={this.seletCouse} key={i}> 
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
                              Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}=${d[i][j+2].Date}${d[i][j].Time}${d[i][j+2].Room}`.trim()
                          })
                           //console.log(j)
                }
               else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===2){  //1
                  row.push(<div>
                                  <div onClick={this.seletCouse(i)}  key={i}>
                                                  <tr className="List_A"  >
                                                      <td>Groups: {G}</td>
                                                      <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                  </tr>
                                  </div>
                             </div>
                          );
                          todo.push({
                              Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`.trim()
                          })
                          //console.log(j)
               }
               else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===3){//2
                  row.push(<div>
                                  <div onClick={this.seletCouse(i) }>
                                                  <tr className="button List_A" >
                                                      <td>Groups: {G}</td>
                                                      <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                      <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
                                                  </tr>
                                  </div>
                           </div>
              );
              //console.log(j)\
                todo.push({
                    Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}`.trim()
                })
               }
            }
            G++;
        }
        this.setState({row:row,todo:todo});
      }
}
seletCouse=(G)=>{
    let d =this.state.Groups;
    //console.log("HHH",G);
}
componentWillMount() {
    this._getWeatherInfo();
  };
  componentDisMount() {
    this.handleSubmit()
  };
    render() {
        let todo=[]
        const {
              Name,
              Credit,
              Groups,
              infoStatus,
              row
          } = this.state
        //   let d =this.state.Groups;
        //   //console.log(d);
        //   var size = Object.keys(d).length;
        //   let G=1;
        //   if(d!==undefined){
        //   for(let i=1;i<=size;i++){
        //       for(let j=0;j<= Object.keys(d[i]).length;j++){ 
        //          //console.log(`key ${j}`,d[i][j]); 
        //         // console.log(Object.keys(d[i]).length)
        //          if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===4){ //3 
        //              row.push(<div>
        //                          <div onClick={this.seletCouse} key={i}> 
        //                                             <tr className="List_A" >
        //                                                 <td>Groups: {G}</td>
        //                                                 <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
        //                                                 <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
        //                                                 <td>{d[i][j+2].Date}:{d[i][j+2].Time}=>{d[i][j+2].Room}</td>
        //                                             </tr>
        //                          </div>
        //                      </div>
        //                      );
        //                      todo.push({
        //                         Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}=${d[i][j+2].Date}${d[i][j].Time}${d[i][j+2].Room}`.trim()
        //                     })
        //                      //console.log(j)
        //           }
        //          else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===2){  //1
        //             row.push(<div>
        //                             <div onClick={this.seletCouse(i)}  key={i}>
        //                                             <tr className="List_A"  >
        //                                                 <td>Groups: {G}</td>
        //                                                 <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
        //                                             </tr>
        //                             </div>
        //                        </div>
        //                     );
        //                     todo.push({
        //                         Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}`.trim()
        //                     })
        //                     //console.log(j)
        //          }
        //          else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===3){//2
        //             row.push(<div>
        //                             <div onClick={this.seletCouse(i) }>
        //                                             <tr className="button List_A" >
        //                                                 <td>Groups: {G}</td>
        //                                                 <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
        //                                                 <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
        //                                             </tr>
        //                             </div>
        //                      </div>
        //         );
        //         //console.log(j)\
        //           todo.push({
        //               Date:`${d[i][j].Date}${d[i][j].Time}${d[i][j].Room}=${d[i][j+1].Date}${d[i][j].Time}${d[i][j+1].Room}`.trim()
        //           })
        //          }
        //       }
        //       G++;
        //   }
        // }
          //row.splice(3,4);
          //console.log(size)
          //console.log(row);
          //console.log(this.state.todo);
          let data = null;
          if (infoStatus === 'loaded'&&this.state.row.length>0) {
              data=<div><b>{Name}  - {Credit}</b>
                    {row}
                    </div>
          } else if (infoStatus === 'loading') {
            data = <div className="is-loading">Loading data...</div>
          } else if (infoStatus === 'error') {
            data = <div className="info error">Enter you couse ID</div>
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
