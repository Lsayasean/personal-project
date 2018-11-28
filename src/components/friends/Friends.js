import React, { Component } from 'react';
import axios from 'axios';
import './friends.css';
import { connect } from 'react-redux';
import { getMatch } from '../../ducks/reducer';
import { withStyles } from '@material-ui/core/styles';
import {DotLoader} from 'react-spinners'

class Friends extends Component {
    constructor(){
        super()

        this.state={
            isLoading: true
        }
    }
    async componentDidMount() {
        let res = await axios.get('/get-friends')
        this.props.getMatch(res.data)
        this.setState({isLoading: false})

    }
    render() {
        console.log(this.props)
        let matches = this.props.match.map(ele => {
            return (
                <div key = {ele.profile_id} className='friend-displays'>
                    <div className='friend-images' style={{
                        backgroundImage: `url(${ele.background_image})`
                    }}>
                        <img className='friend-pics' src={ele.profile_image} alt='profile pic' />
                    </div>
                    <div className='friend-info'>
                        <div className='friend-names'><h1>{ele.name}</h1></div>
                        <div className='friend-bios'><h3>{ele.profile_bio}</h3></div>
                    </div>
                    <div className='btn-flip'>
                    </div>
                </div>
            )
        })
        if(this.state.isLoading){
            return(
                <div className='sweet-loading'>
                    <DotLoader 
                    size={50}
                    />
                </div>
            )
        }
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