import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './Home.css';
import Button from '@material-ui/core/Button';

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
        if(res.data.message === 'Logged in.'){
            this.props.history.push('/profile')
        }

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
                    <Button variant='outlined' color='primary' className='form-BTN' type='button' onClick={() => this.login()}>Login</Button>
                    <Link to='/register'><Button variant='outlined' color='primary' className='form-BTN'>Register</Button></Link>
                </form>
            </div>
        );
    }
}

export default Home;