import React, { Component } from 'react';
import './edit.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { userUpdate } from '../../ducks/reducer'
import SweetAlert from 'react-bootstrap-sweetalert'


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.user.name,
            image: this.props.user.image,
            background: this.props.user.backgroundImage,
            bio: this.props.user.bio,
            alert: ''

        }
    }
    async componentDidMount() {
        let res = await axios.get('/user_profile')
        this.props.userUpdate(res.data)
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
        console.log('any')
        let { name, bio, image, background } = this.state;
        console.log(image.length)
        if (!name || !bio || !image || !background) {
            this.setState({ alert: 'Please fill out all fields' })
        } else {
            let resp = await axios.put('/edit-profile', {
                name,
                image,
                bio,
                background
            })
            // let res = await axios.get('/user_profile')
            console.log('resp', resp.data)
            // this.props.userUpdate(res.data)
            this.props.history.push('/profile')
        }
    }


    render() {
        let { image, bio, background } = this.state;
        console.log(this.props)
        return (
            <div className='edit-container'>
                {this.state.alert &&
                    <SweetAlert title={this.state.alert} onConfirm={() => this.setState({ alert: '' })} />
                }
                <form className='edit-form'>
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

function stateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(stateToProps, { userUpdate })(Edit);