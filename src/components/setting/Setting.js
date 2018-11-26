import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './setting.css';


class Setting extends Component {
    render() {
        return (
            <div className='setting-container'>
                <Link to='/edit-profile'><button 
                className='btn'>Edit Profile</button></Link>
                <a href="http://localhost:4000/logout"><button 
                className='btn'>Logout</button></a>
            </div>
        );
    }
}



export default Setting;