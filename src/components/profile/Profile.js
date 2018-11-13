import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userUpdate } from './../../ducks/reducer'
import Nav from './../nav/Nav'
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: {}
        }
    }

    async componentDidMount() {
        let res = await axios.get('/user_profile')
        this.props.userUpdate(res.data)
    }

    render() {
        console.log(this.props.user)
        return (
            <div>
                <Nav />
                <div className='profile-container'>
                    <div>profile picture</div>
                    <div>
                        {this.props.user.name} || {this.props.user.bio}
                        <button className='profile-btn-edit'>edit button</button>
                    </div>
                </div>
                <div className='profile-games-list'>
                    <button className='profile-btn'>find games</button>
                    <h2>Your games</h2>
                </div>
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(stateToProps, { userUpdate })(Profile);