import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userUpdate, updateOwnList } from './../../ducks/reducer'
import './profile.css'
import Button from '@material-ui/core/Button';

class Profile extends Component {

    async componentDidMount() {
        let res = await axios.get('/user_profile')
        this.props.userUpdate(res.data)
        let res2 = await axios.get(`/my-games/${this.props.user.id}`)
        this.props.updateOwnList(res2.data)
        console.log('games list', res2.data)
    }

    async removeGame(id) {
        let res = await axios.delete(`/delete/${id}`)
        this.props.updateOwnList(res.data)

    }

    render() {
        console.log(this.props.user)
        let myList = this.props.userGames.map(ele => {
            return (
                <div key={ele.owned_id} className='game-list'>
                    <h1 className='game-title'>{ele.game_name}</h1>
                    <div className='games-image'>
                        <img className='img' src={ele.game_pic} alt='game pic' />
                    </div>
                    <Button className='add-btn'
                        variant="outlined" color="secondary"
                        onClick={() => this.removeGame(ele.owned_id)}
                    >remove</Button>
                </div>
            )
        })
        return (
            <div className='profile-container'>
                <div className='profile-image' style={{
                    backgroundImage: `url(${this.props.user.backgroundImage})`
                }}>
                    <img className='profile-pic' src={this.props.user.image} alt='profile pic' />
                </div>
                <div className='profile-info'>
                    <div className='profile-name'><h1>{this.props.user.name}</h1></div>
                    <div className='profile-bio'><h3>{this.props.user.bio}</h3></div>
                </div>
                <div className='profile-games-list'>
                    <h2 className='h2-game-list'>Your Games List:</h2>
                    <div className='game-list'>
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