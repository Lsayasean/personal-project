import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(res)
    }

    render() {
        return (
            <div>
                <form className='login-form'>
                    <div>
                        <label>Email:</label>
                        <br />
                        <input type='email' onChange={(e) => this.updateEmail(e)} />
                    </div>
                    <div>
                        <label>password:</label>
                        <br />
                        <input type='password' onChange={(e) => this.updatePass(e)} />
                    </div>
                    <button type='button' onChange={() => this.login()}>Login</button>
                    <button type='button' onChange={() => this.register()}>Register</button>
                </form>
            </div>
        );
    }
}

export default Home;