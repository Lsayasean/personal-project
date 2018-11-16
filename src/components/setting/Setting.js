import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import './setting.css';


class Setting extends Component {
    render() {
        return (
            <div className='setting-container'>
                <Link to='/edit-profile'><Button 
                classes={{
                    label: this.props.classes.label
                }}
                variant="outlined" color="primary" className='btn'>Edit Profile</Button></Link>
                <a href="http://localhost:4000/logout"><Button 
                classes={{
                    label: this.props.classes.label
                }}
                variant="outlined" color="primary" className='btn'>Logout</Button></a>
            </div>
        );
    }
}

const styles = {
    label: {
        fontSize: '20px'
    }
}


export default withStyles(styles)(Setting);