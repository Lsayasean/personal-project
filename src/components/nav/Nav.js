import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div>
                <Link to='/message'><i class="fas fa-comment-alt"></i></Link>
            </div>
        );
    }
}

export default Nav;