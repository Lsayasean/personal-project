import React, { Component } from 'react';
import axios from 'axios';
import { gameList, updateGameList } from './../../ducks/reducer';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import './gameList.css'

class GameList extends Component {
    async componentDidMount() {
        let res = await axios.get('/games-list')
        this.props.gameList(res.data)
    }

    addGame(id){
        axios.get(`/add-games/${id}`)
    }
    render() {
        console.log(this.props.userGames)
        let lists = this.props.games.map(ele => {
            return (
                <div key={ele.game_id} className='game-list'>
                    <h1 className='game-title'>{ele.game_name}</h1>
                    <div className='games-image'>
                        <img className='img' src={ele.game_pic} alt='game pic' />
                    </div>
                    <h2 className='game-title'>Add games to list</h2>
                   <Button className='add-btn' 
                   variant="outlined" color="secondary"
                   onClick={() => this.addGame(ele.game_id)}
                   >add</Button>
                </div>
            )
        })
        return (
            <div className='game-list-container'>
                {lists}
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        games: state.games,
        userGames: state.userGames
    }
}
const dispatchToProps = {
    gameList,
    updateGameList
}

export default connect(stateToProps, dispatchToProps)(GameList);