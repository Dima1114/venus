import React, {Component} from 'react';
import '../App.css';
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

class ProtectedRoute extends Component {

    render() {
        const {component: Component, ...other} = this.props;
        return (
            <Route {...other} render={(props) => (
                this.props.auth.isAuthenticated === true
                    ? <Component {...props} />
                    : <Redirect to='/login'/>
            )}/>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);