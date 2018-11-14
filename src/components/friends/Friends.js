import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getMatch} from '../../ducks/reducer';

class Friends extends Component {
    async componentDidMount(){
        let res = await axios.get('/get-friends')
        this.props.getMatch(res.data)

    }
    render() {
        console.log(this.props)
        return (
            <div>
            </div>
        );
    }
}

function stateToProps(state){
    return{
        match: state.match
    }
}

export default connect(stateToProps, {getMatch})(Friends);