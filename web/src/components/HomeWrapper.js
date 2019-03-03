import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../App.css';
import $ from "jquery";
import logo from "../logo.svg";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import TodoList from "../components/TodoList";
import {initBaseUrl} from "../actions";
import {logoutAndRedirect, refreshToken} from "../actions/auth";
import {bindActionCreators} from "redux";
import ProtectedRoute from "../elements/ProtectedRoute";
import {SimpleLink} from "../elements/styledElements";
import DrawButton from "../elements/DrawButton";

const baseUrl = 'http://localhost:3000';

class HomeWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshTimer: null
        }
    }

    componentWillMount() {
        this.props.initBaseUrl(baseUrl);
        this.refreshTokenOnReload(baseUrl);

        if (!!this.props.auth.accessToken) {
            $.ajaxSetup({
                headers: {
                    "X-Auth": this.props.auth.accessToken
                }
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContent) {
        this.refreshCountDown(nextProps);
        this.clearRefreshCountDown(nextProps);
        if (!!nextProps.auth.accessToken) {
            $.ajaxSetup({
                headers: {
                    "X-Auth": 'Bearer ' + nextProps.auth.accessToken
                }
            })
        }
    }

    refreshTokenOnReload(baseUrl) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!this.props.auth.isAuthenticated && !!refreshToken) {
            this.props.refreshToken(baseUrl, refreshToken)
        }
    }

    refreshCountDown(props) {
        if (props.auth.isAuthenticated && !!props.auth.expTime) {
            const timeOut = props.auth.expTime * 1000 - new Date().getTime() - 60000;
            console.log(timeOut);
            const refreshTimer = setTimeout(
                () => this.props.refreshToken(this.props.baseUrl, props.auth.refreshToken), timeOut);
            this.setState({refreshTimer: refreshTimer})
        }
    }

    clearRefreshCountDown(props) {
        if (props.auth.isAuthenticated === false) {
            clearTimeout(this.state.refreshTimer);
            this.setState({refreshTimer: null})
        }
    }

    render() {
        return (
            <Router>
                <div className={"wrapper"}>
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <div className={'App-nav'}>

                            {this.props.auth.isAuthenticated ?
                                <DrawButton id={'logout'}
                                            onClick={() => this.props.logout(this.props.baseUrl)}>Logout and go</DrawButton>
                                :
                                <SimpleLink to={'/login'}>
                                    <DrawButton id={'login'}>Login</DrawButton>
                                </SimpleLink>}

                            <span style={{marginLeft: 10}}/>

                            {this.props.auth.isAuthenticated ?
                                <SimpleLink to={'/todo'}>
                                    <DrawButton id={'todo'}>Todo</DrawButton>
                                </SimpleLink>
                                : null}

                        </div>

                    </div>

                    <Switch>
                        <Route exact path={'/login'} component={LoginComponent}/>
                        <ProtectedRoute path={'/todo'} component={TodoList}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    baseUrl: state.initBaseUrl.baseUrl,

});

const mapDispatchToProps = (dispatch) => ({
    refreshToken: bindActionCreators(refreshToken, dispatch),
    initBaseUrl: bindActionCreators(initBaseUrl, dispatch),
    logout: bindActionCreators(logoutAndRedirect, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
