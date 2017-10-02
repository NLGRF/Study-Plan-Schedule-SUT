import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import Add_List   from './components/Add_List'
class App extends Component {
  render() {
    return (
      <div className="App" style={{paddingLeft:250,paddingRight:250,marginTop:50}}>
        <div style={{textAlign:'center'}}> 
          <Add_List />
        </div>
      </div>
    ); 
  }
}

export default App;
