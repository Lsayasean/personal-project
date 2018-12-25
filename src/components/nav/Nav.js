import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './nav.css'

class Nav extends Component {
    render() {
        let path = this.props.location.pathname;
        if (path !== '/' && path !== '/register') {
            return (
                <div className='nav-main'>
                    <Link className= 'link' to='/message'><i className="far fa-comment-alt "></i></Link>  
                    <Link className= 'link' to='/profile'><i className="fas fa-home"></i></Link>  
                    <Link className= 'link' to='/friends'><i className="fas fa-user-friends"></i></Link>  
                    <Link className= 'link' to='/games-list'><i className="fas fa-gamepad"></i></Link>  
                    <Link className= 'link' to='/setting'><i className="fas fa-cog"></i></Link>  
                </div>
            )
        } else {
            return (
                <div className='nav-main2'>
                    <h1 className='nav-title'>First Person QT</h1>
                    <h3 className='nav-title'> Social media for gamers</h3>
                </div>
            )
        }
    }
}

export default withRouter(Nav);