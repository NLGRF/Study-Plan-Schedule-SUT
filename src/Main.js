import React, { Component } from 'react'
import  { Route,Switch} from 'react-router-dom'
import Add_input from './components/Add_input'
import Add_List from './components/Add_List'
import Tables from './components/Table'
import Info from './components/info'
import MyConsole from './components/myconsole'
import Login from './components/User/Login'
import Signup from './components/User/Signup'
export default class Main extends Component {
    render() {
        return (
            <div>
             <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/info' component={Info}/>
                <Route path='/user/console' component={MyConsole}/>
             </Switch>
            </div>
        )
    }
}
