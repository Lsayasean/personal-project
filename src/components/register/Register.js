import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './register.css';

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            bio: ''
        }
    }

    updateName(e){
        this.setState({name: e.target.value})
    }

    updateEmail(e){
        this.setState({email: e.target.value})
    }

    updatePass(e){
        this.setState({password: e.target.value})
    }

    updateBio(e){
        this.setState({bio: e.target.value})
    }


    async register() {
        let { email, password, name, bio } = this.state;
        if (!email || !password || !name || !bio) {
            return alert('Please fill out all fields.')
        }
        console.log(email, password, name, bio)
        let res = await axios.post('/auth/register', {
            email,
            password,
            name,
            bio

        })
        console.log(res)
        if(res.data.message === 'Logged in.'){
            this.props.history.push('/profile')
        }
    }
    render() {
        return (
            <div className='register-container'>
                <form className='register-form'>
                    <div>
                        <label>Name:</label>
                        <br />
                        <input className='form-input' placeholder='name' type='text' onChange={(e) => this.updateName(e)} />
                    </div>
                    <div>
                        <label>Email::</label>
                        <br />
                        <input className='form-input' placeholder='email' type='email' onChange={(e) => this.updateEmail(e)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <br />
                        <input className='form-input' placeholder='Password' type='password' onChange={(e) => this.updatePass(e)} />
                    </div>
                    <div>
                        <label>Bio:</label>
                        <br />
                        <input className='form-input' placeholder='Type of gamer' type='text' onChange={(e) => this.updateBio(e)} />
                    </div>
                    <button className='form-BTN' type='button' onClick={() => this.register()}>Register</button>
                    <Link to='/'><button className='form-BTN' type='button'>Back</button></Link>
                </form>
            </div>
        );
    }
}

export default Register;