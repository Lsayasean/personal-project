import React, { Component } from 'react';
import './edit.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {userUpdate} from '../../ducks/reducer'

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            image: '',
            background: '',
            bio: ''

        }
    }

    updateName(e){
        this.setState({name: e.target.value})
    }
    updateImage(e){
        this.setState({image: e.target.value})
    }

    updateBio(e){
        this.setState({bio: e.target.value})
    }
    updateBackground(e){
        this.setState({background: e.target.value})
    }


    async updateInfo(){
        let {name, bio, image, background} = this.state;
        console.log(image.length)
        if (!name || !bio || !image || !background) {
            return alert('Please fill out all fields.')
        }
        let res = await axios.put('/edit-profile', {
            name,
            image,
            bio,
            background
        })
        this.props.userUpdate(res.data)
        this.props.history.push('/profile')

    }


    render() {
        return (
            <div className='edit-container'>
                <form className='edit-form'>
                    <div>
                        <label>Name:</label>
                        <br />
                        <input className='edit-input' placeholder='name' type='text' onChange={(e) => this.updateName(e)} />
                    </div>
                    <div>
                        <label>Profile-Image:</label>
                        <br />
                        <input className='edit-input' placeholder='image-URL' type='text' onChange={(e) => this.updateImage(e)} />
                    </div>
                    <div>
                        <label>Background:</label>
                        <br />
                        <input className='edit-input' placeholder='background-URL' type='text' onChange={(e) => this.updateBackground(e)} />
                    </div>
                    <div>
                        <label>Bio:</label>
                        <br />
                        <input className='edit-input' placeholder='Type of gamer' type='text' onChange={(e) => this.updateBio(e)} />
                    </div>
                    <button
                    type='button'
                    onClick={() => this.updateInfo()}
                    className='edit-btn'
                    >Update</button>
                </form>
            </div>
        );
    }
}

function stateToProps(state){
    return {
        user: state.user
    }
}

export default connect(stateToProps, {userUpdate})(Edit);