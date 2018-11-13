import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css'

class Nav extends Component {
    render() {
        let path = this.props.location.pathname;
        if (path !== '/' && path !== '/register') {
            return (
                <div className='nav-main'>
                    <Link to='/message'><i className="far fa-comment-alt "></i></Link>  
                    <Link to='/profile'><i className="fas fa-home"></i></Link>  
                    <Link to='/friends'><i className="fas fa-plus"></i></Link>  
                    <Link to='/games-list'><i className="fas fa-search"></i></Link>  
                    <Link to='/setting'><i className="fas fa-cog"></i></Link>  
                </div>
            )
        } else {
            return null;
        }
    }
}

export default withRouter(Nav);