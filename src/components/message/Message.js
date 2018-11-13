import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Message extends Component {
    render() {
        return (
            <div>
                messages goes here!
                <Link to='/profile'><i class="fas fa-arrow-circle-left"></i></Link>
            </div>
        );
    }
}

export default Message;