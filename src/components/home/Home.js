import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            alert: ''
        }
    }

    updateEmail(e) {
        this.setState({ email: e.target.value })
    }

    updatePass(e) {
        this.setState({ password: e.target.value })
    }

    async login(e) {
        e.preventDefault()
        let { email, password } = this.state;
        if (!this.state.email || !this.state.password) {
            this.setState({ alert: 'Please fill out all fields' })
        } else {
            let res = await axios.post('/auth/login', {
                email: email,
                password: password
            })
            if (res.data.message === 'Logged in.') {
                this.props.history.push('/profile')
            }

        }
    }

    render() {
        return (
            <div className='form-container'>
                {this.state.alert &&
                    <SweetAlert title={this.state.alert} onConfirm={() => this.setState({ alert: '' })} />
                }
                <form className='login-form' onSubmit={(e) => this.login(e)}>
                    <div>
                        <label>Email:</label>
                        <br />
                        <input className='form-input' placeholder='Email' type='email' onChange={(e) => this.updateEmail(e)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <br />
                        <input className='form-input' placeholder='Password' type='password' onChange={(e) => this.updatePass(e)} />
                    </div>
                    <button className='form-BTN' type='submit' >Login</button>
                    <Link to='/register'><button className='form-BTN'>Register</button></Link>
                </form>
            </div>
        );
    }
}

export default Home;