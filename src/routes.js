import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home'
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import Message from './components/message/Message';
import Setting from './components/setting/Setting';
import Friends from './components/friends/Friends';
import GameList from './components/game-list/GameList';
import Edit from './components/edit/Edit';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/message' component={Message} />
        <Route path='/setting' component={Setting} />
        <Route path='/friends' component={Friends} />
        <Route path='/games-list' component={GameList} />
        <Route path='/edit-profile' component={Edit} />
    </Switch>
)