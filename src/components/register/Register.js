import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './register.css';
import SweetAlert from 'react-bootstrap-sweetalert'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            image: 'https://vignette.wikia.nocookie.net/marsargo/images/5/52/Unknown.jpg/revision/latest?cb=20170904102656',
            bio: '',
            background: 'https://i.pinimg.com/originals/ad/47/af/ad47af29ad50df1477b9413f9d521db0.jpg',
            alert: ''
        }
    }

    updateName(e) {
        this.setState({ name: e.target.value })
    }

    updateImage(e) {
        this.setState({ image: e.target.value })
    }

    updateEmail(e) {
        this.setState({ email: e.target.value })
    }

    updatePass(e) {
        this.setState({ password: e.target.value })
    }

    updateBio(e) {
        this.setState({ bio: e.target.value })
    }

    updateBackground(e) {
        this.setState({ background: e.target.value })
    }


    async register(e) {
        e.preventDefault()
        let { email, password, name, bio, image, background } = this.state;
        if (!email || !password || !name || !bio || !image || !background) {
            this.setState({ alert: "Please fill out all fields" })
        } else {
            let res = await axios.post('/auth/register', {
                email,
                password,
                name,
                image,
                bio,
                background

            })
            console.log(res)
            if (res.data.message === 'Logged in.') {
                this.props.history.push('/profile')
            }
            if (res.data.message === 'Email already in use') {
                this.setState({ alert: 'Email already in use' })
            }
        }
    }
    render() {
        return (
            <div className='register-container'>
                {this.state.alert &&
                    <SweetAlert title = {this.state.alert} onConfirm={() => this.setState({alert: ''})} />
                }
                <form className='register-form' onSubmit={(e) => this.register(e)}>
                    <div>
                        <label>Name:</label>
                        <br />
                        <input className='form-inputs' placeholder='name' type='text' onChange={(e) => this.updateName(e)} />
                    </div>
                    <div>
                        <label>Email::</label>
                        <br />
                        <input className='form-inputs' placeholder='email' type='email' onChange={(e) => this.updateEmail(e)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <br />
                        <input className='form-inputs' placeholder='Password' type='password' onChange={(e) => this.updatePass(e)} />
                    </div>
                    <div>
                        <label>Bio:</label>
                        <br />
                        <input className='form-inputs' placeholder='Type of gamer' type='text' onChange={(e) => this.updateBio(e)} />
                    </div>
                    <button className='form-BTNS' type='submit'>Register</button>
                    <Link to='/'><button className='form-BTNS' type='button'>Back</button></Link>
                </form>
            </div>
        );
    }
}

export default Register;