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


    async updateInfo(){
        let {name, bio, image} = this.state;
        console.log(image.length)
        if (!name || !bio || !image) {
            return alert('Please fill out all fields.')
        }
        let res = await axios.put('/edit-profile', {
            name,
            image,
            bio
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
                        <label>Image:</label>
                        <br />
                        <input className='edit-input' placeholder='image' type='text' onChange={(e) => this.updateImage(e)} />
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