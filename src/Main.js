import React, { Component } from 'react'
import  { Route,Switch} from 'react-router-dom'
import Add_input from './components/Add_input'
import Add_List from './components/Add_List'
import Tables from './components/Table'
export default class Main extends Component {
    render() {
        return (
            <div>
             <Switch>
                <Route exact path='/' component={Add_input}/>
                <Route path='/list' component={Add_List}/>
                <Route path='/table' component={Tables}/>
             </Switch>
            </div>
        )
    }
}
