import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import World from './Components/World';


export default function AppRouter() {

    return <div className="page-view-ui">
        <Switch>
            <Route path='/register' component={Register}/>
            <Route exact path='/' component={Login}/>
            <Route path='/world' component={World}/>
        </Switch>
    </div>
}