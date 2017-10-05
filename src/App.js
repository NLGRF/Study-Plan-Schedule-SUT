import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import Main from './Main'
import Add_input   from './components/Add_input'
class App extends Component {
  render() {
    return (
      <div className="App" style={{paddingLeft:240,paddingRight:240,marginTop:50}}>
        <div style={{textAlign:'center'}}> 
        </div> 
          <Main/>
      </div>
    ); 
  }
}

export default App;
