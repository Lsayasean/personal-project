import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './setting.css';


class Setting extends Component {
    render() {
        return (
            <div className='setting-container'>
                <Link to='/edit-profile'><button 
                className='btns'>Edit Profile</button></Link>
                <a href='https://firstpersonqt.com/'><button 
                className='btns'>Logout</button></a>
            </div>
        );
    }
}



export default Setting;