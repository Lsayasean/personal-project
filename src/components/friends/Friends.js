import React, { Component } from 'react';
import axios from 'axios';
import './friends.css';
import { connect } from 'react-redux';
import { getMatch } from '../../ducks/reducer';
import { withStyles } from '@material-ui/core/styles';

class Friends extends Component {
    async componentDidMount() {
        let res = await axios.get('/get-friends')
        this.props.getMatch(res.data)

    }
    render() {
        console.log(this.props)
        let matches = this.props.match.map(ele => {
            return (
                <div key = {ele.profile_id} className='friend-display'>
                    <div className='friend-image' style={{
                        backgroundImage: `url(${ele.background_image})`
                    }}>
                        <img className='friend-pic' src={ele.profile_image} alt='profile pic' />
                    </div>
                    <div className='friend-info'>
                        <div className='friend-name'><h1>{ele.name}</h1></div>
                        <div className='friend-bio'><h3>{ele.profile_bio}</h3></div>
                    </div>
                    <div className='btn-flip'>
                    </div>
                </div>
            )
        })
        return (
            <div className='main-match'>
            <h2 className='p'>Matched Gamer Profiles</h2>
                {matches}
            </div>
        );
    }
}

function stateToProps(state) {
    return {
        match: state.match
    }
}

const styles = {
    label: {
        fontSize: '20px'
    }
}

const StyledProfile = withStyles(styles)(Friends)

export default connect(stateToProps, { getMatch })(StyledProfile);