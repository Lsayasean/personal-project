import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userUpdate, updateOwnList } from './../../ducks/reducer'
import './profile.css'

class Profile extends Component {

    async componentDidMount() {
        let res = await axios.get('/user_profile')
        this.props.userUpdate(res.data)
        let res2 = await axios.get(`/my-games/${this.props.user.id}`)
        this.props.updateOwnList(res2.data)
        console.log('games list', res2.data)
    }

    async removeGame(id){
        let res = await axios.delete(`/delete/${id}`)
        this.props.updateOwnList(res.data)

    }

    render() {
        let myList = this.props.userGames.map(ele => {
            return (
                <div key={ele.owned_id} className='game-list'>
                    <h1 className='game-title'>{ele.game_name}</h1>
                    <div className='games-image'>
                        <img className='img' src={ele.game_pic} alt='game pic' />
                    </div>
                    <button className='add-btn' 
                   onClick={() => this.removeGame(ele.owned_id)}
                   >remove</button>
                </div>
            )
        })
        return (
            <div className='profile-container'>
                <div>
                    <img className='profile-pic' src={this.props.user.image} alt='profile pic' />
                    <div className='profile-info'>
                        <div className='profile-name'>{this.props.user.name}</div>
                        <div className='profile-bio'>{this.props.user.bio}</div>
                    </div>
                </div>
                <div className='profile-games-list'>
                    <h2>Your games</h2>
                    <div>
                        {myList}
                    </div>
                </div>
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        user: state.user,
        userGames: state.userGames

    }
}

const dispatchToProps = {
    userUpdate,
    updateOwnList
}

export default connect(stateToProps, dispatchToProps)(Profile);