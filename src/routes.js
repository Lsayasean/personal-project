import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home'
import Register from './components/register/Register';
import Profile from './components/profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
    </Switch>
)