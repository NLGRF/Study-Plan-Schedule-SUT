import React  from 'react'
class List_table extends React.Component {
   constructor(){
     super();
     this.state={
         Name:undefined,
         Credit:undefined,
         Groups:[],
         couse:'102108'
     }
 }
componentWillMount(){
      const main =this;
      let couse = ' ';
      if(this.props.id){
       this.setState({couse:this.props.id})
      }else{
         this.setState({couse:'523101'})
      }
      console.log(couse);
    main.setState({
        infoStatus: 'loading'
    });
    if(main.props.id){
    fetch(`https://still-mountain-63520.herokuapp.com/api.php?id=${this.state.couse}`)//103101 202109
    .then( function(response) {
      return response;
    })
    .then( function(response) {
        setTimeout( function() {
            main.setState({
            infoStatus: 'loaded'
          });
          }, 1000);
      return response.json();
    }).then((data)=>{
        let G=data.Groups;
       main.setState({
            Name:data.Name,
            Credit:data.Credit,
            Groups:data.Groups
        })
    }).catch( function() {
        main.setState({
          infoStatus: 'error'
        });
    }); 

 }
}
    render() {
       // ['Two', 'Three']
        // console.log(this.props.id)
           let row=[]
            const {
                  Name,
                  Credit,
                  Groups,
                  infoStatus
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
                                     <div>
                                                        <tr className="List_A">
                                                            <td>Groups: {G}</td>
                                                            <td>{d[i][j].Date}:{d[i][j].Time}=>{d[i][j].Room}</td>
                                                            <td>{d[i][j+1].Date}:{d[i][j+1].Time}=>{d[i][j+1].Room}</td>
                                                            <td>{d[i][j+2].Date}:{d[i][j+2].Time}=>{d[i][j+2].Room}</td>
                                                        </tr>
                                     </div>
                                 </div>
                                 );
                                 //console.log(j)
                      }
                     else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===2){  //1
                        row.push(<div>
                                    <div>Groups {G} 
                                                    {d[i][j].Date} 
                                                    Time: {d[i][j].Time} Room: {d[i][j].Room} </div>
                                   </div>
                                );
                                //console.log(j)
                     }
                     else if((d[i][j]!==undefined&&j===0)&&Object.keys(d[i]).length===3){//2
                        row.push(<li>
                        <div>Groups {G}  Time: {d[i][j].Date} {d[i][j].Time} {d[i][j+1].Date} {d[i][j+1].Time} Room:{d[i][j+1].Room}</div>
                      </li>
                    );
                    //console.log(j)
                     }
                  }
                  G++;
              }
            }
             // row.splice(3,4);
              //console.log(size)
              //console.log(row);
              let data = null;
              if (infoStatus === 'loaded') {
                  data=<div><b>{Name}  - {Credit}</b></div>
              } else if (infoStatus === 'loading') {
                data = <div className="is-loading">Loading data...</div>
              } else if (infoStatus === 'error') {
                data = <div className="info error">Error while loading weather data. Try again later.</div>
              }
        return (
            <div className="container" style={{textAlign:'center'}}>
                <table className="table is-narrow">
                <tbody>
                    <br/>
                    {data}
                    {row}
                </tbody>
              </table>
            </div>
        )
    }
}
export default List_table;