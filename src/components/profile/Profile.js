import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { userUpdate, updateOwnList } from './../../ducks/reducer'
import './profile.css'
import ReactCardFlip from 'react-card-flip';
import {DotLoader} from 'react-spinners'


class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFlipped: false,
            isLoading: true
        }
    }

    async componentDidMount() {
        console.log('profile comp did mob')
        let res = await axios.get('/user_profile')
        console.log(res)
        this.props.userUpdate(res.data)
        let res2 = await axios.get(`/my-games/${this.props.user.id}`)
        this.props.updateOwnList(res2.data)
        console.log('games list', res2.data)
        this.setState({isLoading: false})
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


        let containerStyle = !this.state.isFlipped ? {
            height: '90vh',
            overflow: 'hidden'
        } : { minHeight: '100vh' }

        if(this.state.isLoading){
            return(
                <div className='sweet-loading'>
                    <DotLoader 
                    size={50}
                    />
                </div>
            )
        }
        return (
            <div style={containerStyle}>
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
                            <div className='btn-flip'>
                                <button
                                    className='btn-list'
                                    onClick={() => this.handleClick()}
                                >
                                    View Game List </button>
                            </div>
                        </div>
                    </div>
                    <div key='back' className='game-lists'>
                        {myList}
                        <div className='button-margin'>
                            <button
                                className='btn-list'
                                onClick={() => this.handleClick()}
                            >
                                Profile
                        </button>
                        </div>
                    </div>
                </ReactCardFlip>
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