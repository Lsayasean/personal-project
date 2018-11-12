import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userUpdate} from './../../ducks/reducer'
import './profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: {}
        }
    }

    async componentDidMount(){
        let res = await axios.get('/user_profile')
        this.props.userUpdate(res.data)
    }

    render() {
        return (
            <div className='profile-container'>
                <div className='profile-header'>
                    <p>message icon here</p>
                    <buton>Logout</buton>
                </div>
                <div>profile picture</div>
                <div>
                    name || bio
                        <button className='profile-btn-edit'>edit button</button>
                </div>
                <div>
                    <h2>Your games</h2>
                    <button className='profile-btn'>find games</button>
                    <div>games list</div>
                </div>
            </div>
        );
    }
}

function stateToProps(state){
    return {
        user: state.user
    }
}

export default connect(stateToProps, {userUpdate})(Profile);