import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import './message.css'

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: []
        };

        this.socket = io('localhost:4000');

        this.sendMessage = () => {
            this.socket.emit('SEND_MESSAGE', {
                message: this.state.message,
                name: this.props.user.name
            });
            axios.post('/messages', {
                message: this.state.message,
                name: this.props.user.name
            })
            this.setState({ message: '' });
        }

        this.socket.on('RECEIVE_MESSAGE', () => {
            axios.get('/get-messages').then(res => {
                this.setState({ messages: res.data })
            })
        });
    }

    async componentDidMount() {
        let res = await axios.get('/get-messages')
        this.setState({ messages: res.data })
    }

    updateMessage(e) {
        this.setState({ message: e.target.value })
    }


    render() {
        let mes = this.state.messages.map((ele, i) => {
            return (<div key={i} className='messages'>{ele.user_name}: {ele.mes}</div>)
        })
        return (
            <div className='main'>
                <div className='mess'>
                    {mes}
                    <div className='input-box'>
                        <input placeholder='...'
                            value={this.state.message}
                            className='input-text'
                            onChange={(e) => this.updateMessage(e)}
                        />

                        <Button
                            className='btn-send'
                            onClick={() => this.sendMessage()}
                        ><i className="fas fa-paper-plane"></i></Button>
                    </div>
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

export default connect(stateToProps)(Message);