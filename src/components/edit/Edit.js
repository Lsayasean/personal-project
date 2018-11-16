import React, { Component } from 'react';
import './edit.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { userUpdate } from '../../ducks/reducer'
import Button from '@material-ui/core/Button';


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.user.name,
            image: this.props.user.image,
            background: this.props.user.backgroundImage,
            bio: this.props.user.bio

        }
    }
    async componentDidMount() {
        let res = await axios.get('/user_profile')
        this.props.userUpdate(res.data)
    }

    updateName(e) {
        this.setState({ name: e.target.value })
    }
    updateImage(e) {
        this.setState({ image: e.target.value })
    }

    updateBio(e) {
        this.setState({ bio: e.target.value })
    }
    updateBackground(e) {
        this.setState({ background: e.target.value })
    }


    async updateInfo() {
        let { name, bio, image, background } = this.state;
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
        let { name, image, bio, background } = this.state;
        console.log(this.props)
        return (
            <div className='edit-container'>
                <form className='edit-form'>
                    <div>
                        <label>Name:</label>
                        <br />
                        <input className='edit-input' value={name} placeholder='name' type='text' onChange={(e) => this.updateName(e)} />
                    </div>
                    <div>
                        <label>Profile-Image:</label>
                        <br />
                        <input className='edit-input' value={image} placeholder='image-URL' type='text' onChange={(e) => this.updateImage(e)} />
                    </div>
                    <div>
                        <label>Background:</label>
                        <br />
                        <input className='edit-input' value={background} placeholder='background-URL' type='text' onChange={(e) => this.updateBackground(e)} />
                    </div>
                    <div>
                        <label>Bio:</label>
                        <br />
                        <input className='edit-input' value={bio} type='text' onChange={(e) => this.updateBio(e)} />
                    </div>
                    <Button
                        variant="contained"
                        type='button'
                        onClick={() => this.updateInfo()}
                        className='edit-btn'
                    >Update</Button>
                </form>
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(stateToProps, { userUpdate })(Edit);