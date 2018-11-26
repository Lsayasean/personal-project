import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userUpdate, updateOwnList } from './../../ducks/reducer'
import './profile.css'
import ReactCardFlip from 'react-card-flip';


class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFlipped: false
        }
    }

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

    handleClick() {
        this.setState({ isFlipped: !this.state.isFlipped });
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
                    <div className='btn-g'>
                        <button className='add-btn'
                            onClick={() => this.removeGame(ele.owned_id)}
                        >remove</button>
                    </div>
                </div>
            )
        })



        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} className='profile-container' infinite>
                <div key='front' className='front'>
                    <div className='profile-image' style={{
                        backgroundImage: `url(${this.props.user.backgroundImage})`
                    }}>
                        <img className='profile-pic' src={this.props.user.image} alt='profile pic' />
                    </div>
                    <div className='profile-info'>
                        <div className='profile-name'><h1>{this.props.user.name}</h1></div>
                        <div className='profile-bio'><h3>{this.props.user.bio}</h3></div>
                    </div>
                    <div className='btn-flip'>
                        <button
                            // classes={{
                            //     label: this.props.classes.label
                            // }}
                            // labelStyle={{ fontSize: '50px' }}
                            className='btn-list'
                            // variant="outlined" color="primary"
                            onClick={() => this.handleClick()}
                        >
                            View Game List
                        </button>
                    </div>
                </div>
                <div key='back' className='game-list'>
                    {myList}
                    <div className='button-margin'>
                        <button
                            // labelStyle={{ fontSize: '50px' }}
                            className='btn-list'
                            onClick={() => this.handleClick()}
                        >
                            Profile
                        </button>
                    </div>
                </div>
            </ReactCardFlip>
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