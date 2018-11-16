import React, { Component } from 'react';
import io from 'socket.io-client';
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
                message: this.state.message
            });
            this.setState({message: ''});
        }

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };
    }

    updateMessage(e) {
        this.setState({ message: e.target.value })
    }


    render() {
        let mes = this.state.messages.map(ele => {
            return (<div>{ele.message}</div>)
        })
        return (
            <div className='main'>
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
        );
    }
}

export default Message;