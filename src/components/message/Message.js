import React, { Component } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux'
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
            let res = axios.post('/messages', {
                message: this.state.message,
                name: this.props.user.name
            })
            // this.socket.on('RECEIVE_MESSAGE', () => {
            //     this.setStat({messages: res.data})
            //     console.log('from recieve_mes',res.data)
            // })
            console.log('res', res)
            this.setState({message: ''});
        }

        this.socket.on('RECEIVE_MESSAGE', function (data) {
            console.log(addMessage)
            addMessage(data);
            console.log('data',data)
        });
        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
        };
    }

    async componentDidMount(){
        let res = await axios.get('/get-messages')
        console.log('componentdidmount',res.data)
        this.setState({messages: res.data})
    }

    updateMessage(e) {
        this.setState({ message: e.target.value })
    }


    render() {
        let mes = this.state.messages.map((ele, i) => {
            return (<div key={i}>{ele.user_name}: {ele.mes}</div>)
        })
        console.log(this.props.user.name,'messages', this.state.messages)
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

function stateToProps(state){
    return {
        user: state.user
    }
}

export default connect(stateToProps)(Message);