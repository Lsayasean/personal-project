import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Home.css';

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    updateEmail(e){
        this.setState({email: e.target.value})
    }

    updatePass(e){
        this.setState({password: e.target.value})
    }

    async login(){
        let {email, password} = this.state;
        if(!this.state.email || !this.state.password){
            return alert('Please fill out all fields.')
        }
        let res = await axios.post('/auth/login',{
            email: email,
            password: password
        })
        console.log(res.data)
    } 

    render() {
        return (
            <div className='form-container'>
                <form className='login-form'>
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
                    <button className='form-BTN' type='button' onClick={() => this.login()}>Login</button>
                    <Link to='/register'><button className='form-BTN'>Register</button></Link>
                </form>
            </div>
        );
    }
}

export default Home;