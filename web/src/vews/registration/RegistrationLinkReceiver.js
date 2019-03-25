import React, {Component} from 'react';
import {connect} from 'react-redux'
import './registration.css';
import '../../App.css';
import {bindActionCreators} from "redux";
import {parse} from 'query-string'
import {completeRegistration, refreshToken} from "../../actions/auth";
import Overlay from "../overlay/Overlay";
import {Redirect} from "react-router-dom";
import Error from "../error/Error";

class RegistrationLinkReceiver extends Component {

    componentWillReceiveProps(nextProps, nextContent) {
        if (!!nextProps.baseUrl && !this.props.baseUrl) {
            const token = parse(this.props.location.search).token;
            this.props.completeRegistration(token);
        }
        if (this.props.auth.registration.isRegistered === false && nextProps.auth.registration.isRegistered === true) {
            this.refreshAfterRegistration(nextProps)
        }
    }

    refreshAfterRegistration(props) {
        this.props.refreshToken(props.auth.refreshToken);
    }

    render = () => (
        <div className={'app-body'}>
            {this.props.auth.registration.isRegistered === true && this.props.auth.isAuthenticated === true ?
                <Redirect to={'/'}/> : <Overlay/>}
            {!!this.props.auth.registration.globalError &&
            <Error error={this.props.auth.registration.globalError}/>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    baseUrl: state.initBaseUrl.baseUrl
});

const mapDispatchToProps = dispatch => ({
    completeRegistration: bindActionCreators(completeRegistration, dispatch),
    refreshToken: bindActionCreators(refreshToken, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationLinkReceiver);
