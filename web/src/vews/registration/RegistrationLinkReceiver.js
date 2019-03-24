import React, {Component} from 'react';
import {connect} from 'react-redux'
import './registration.css';
import {Redirect} from "react-router-dom";
import {bindActionCreators} from "redux";
import {parse} from 'query-string'

class RegistrationLinkReceiver extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null
        }
    }

    completeRegistration() {
        const token = parse(this.props.location.search).token;
        this.props.completeRegistration(token)
    }

    render() {
        return <Redirect to={'/'}/>;
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    completeRegistration: bindActionCreators(completeRegistration, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationLinkReceiver);
