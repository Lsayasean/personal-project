import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux'
import axios from 'axios'
import './message.css'
import {DotLoader} from 'react-spinners'

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: [],
            isLoading: true
        };

        this.socket = io();

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
        this.setState({ messages: res.data, isLoading: false })
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    updateMessage(e) {
        this.setState({ message: e.target.value })
    }

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }



    render() {
        let mes = this.state.messages.map((ele, i) => {
            return (<div key={i} className='messages container'>{ele.user_name}: {ele.mes}</div>)
        })
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
            <div className='main'>
                <div className='mess'>
                    {mes}
                </div>
                <div ref={el => { this.messagesEnd = el }}></div>
                <div className='outer-box'>
                    <div className='input-box'>
                        <input placeholder='...'
                            value={this.state.message}
                            className='input-text'
                            onChange={(e) => this.updateMessage(e)}
                        />


                        <button
                            className='btn-send'
                            onClick={() => this.sendMessage()}
                        ><i className="fas fa-paper-plane"></i></button>
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