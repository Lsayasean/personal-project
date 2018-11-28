import React, { Component } from 'react'
import axios from 'axios'
import { DotLoader } from 'react-spinners'
import SweetAlert from 'react-bootstrap-sweetalert'
import './addgame.css'

class AddGame extends Component {
    constructor() {
        super()

        this.state = {
            isLoading: true,
            name: '',
            picture: '',
            alert: ''
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    updateName(e) {
        this.setState({ name: e.target.value })
    }
    updatePicture(e) {
        this.setState({ picture: e.target.value })
    }

    async updateGameList() {
        let { name, picture } = this.state;
        if (!name || !picture) {
            this.setState({ alert: 'Please fill out all fields' })
        } else {
            let res = await axios.post('/add-game', {name, picture})
            if(res.data){
                this.props.history.push('/games-list')
            }
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div className='sweet-loading'>
                    <DotLoader
                        size={50}
                    />
                </div>
            )
        }
        return (
            <div className='edit-container'>
                {this.state.alert &&
                    <SweetAlert title={this.state.alert} onConfirm={() => this.setState({ alert: '' })} />
                }
                <form className='edit-form'>
                    <div>
                        <label>Game Name:</label>
                        <br />
                        <input className='edit-input' value={this.state.name} placeholder='Game Title' onChange={(e) => this.updateName(e)} />
                    </div>
                    <div>
                        <label>Game Picture:</label>
                        <br />
                        <input className='edit-input' value={this.state.picture} placeholder='Game Picture URL' onChange={(e) => this.updatePicture(e)} />
                    </div>
                    <div>
                        <button
                            type='button'
                            className='edit-btn'
                            onClick={() => this.updateGameList()}
                        >Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddGame;