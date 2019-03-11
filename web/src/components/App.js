import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../App.css';
import $ from "jquery";
import logo from "../logo.svg";
import {Route, Switch, withRouter} from "react-router-dom";
import LoginComponent from "../vews/login/LoginComponent";
import TodoList from "../vews/todo/TodoList";
import {initBaseUrl} from "../actions";
import {logoutAndRedirect, refreshToken} from "../actions/auth";
import {bindActionCreators} from "redux";
import ProtectedRoute from "../elements/ProtectedRoute";
import {SimpleLink} from "../elements/styledElements";
import DrawnButton from "../elements/DrawnButton";
import Home from "../vews/home/Home";

const baseUrl = 'http://localhost:3000';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshTimer: null
        }
    }

    componentWillMount() {
        this.props.initBaseUrl(baseUrl);
        this.refreshTokenOnReload();
        this.setUp(this.props);
    }

    componentWillReceiveProps(nextProps, nextContent) {
        this.refreshCountDown(nextProps);
        // this.clearRefreshCountDown();
        this.setUp(nextProps);
    }

    setUp(props) {
        if (!!props.auth.accessToken) {
            $.ajaxSetup({
                beforeSend: (xhr, options) => {
                    options.url = this.props.baseUrl + options.url;
                },
                headers: {
                    "X-Auth": 'Bearer ' + props.auth.accessToken
                }
            })
        }
    }

    refreshTokenOnReload() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!this.props.auth.isAuthenticated && !!refreshToken) {
            this.props.refreshToken(refreshToken);
        }
    }

    refreshCountDown(props) {
        if (props.auth.isAuthenticated && !!props.auth.expTime) {
            this.clearRefreshCountDown();
            const timeOut = props.auth.expTime * 1000 - new Date().getTime() - 60000;
            const refreshTimer = setTimeout(
                () => this.props.refreshToken(props.auth.refreshToken), timeOut);
            this.setState({refreshTimer: refreshTimer});
        }
    }

    clearRefreshCountDown() {
        clearTimeout(this.state.refreshTimer);
        this.setState({refreshTimer: null});
    }

    render() {
        return (
            <div id={"wrapper"}>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    {this.props.auth.isAuthenticated ?
                        <div className={'App-nav'}>
                            <SimpleLink to={'/'}>
                                <DrawnButton id={'home'}>home</DrawnButton>
                            </SimpleLink>
                            <span style={{marginLeft: 10}}/>
                            <SimpleLink to={'/todo'}>
                                <DrawnButton id={'todo'}>Todo</DrawnButton>
                            </SimpleLink>
                            <span style={{marginLeft: 10}}/>
                            <DrawnButton id={'logout'}
                                         onClick={() => this.props.logout()}>Logout</DrawnButton>
                        </div>
                        : null}
                </div>

                <Switch>
                    <Route exact path={'/login'} component={LoginComponent}/>
                    <ProtectedRoute path={'/todo'} component={TodoList}/>
                    <ProtectedRoute path={'/'} component={Home}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    baseUrl: state.initBaseUrl.baseUrl,
});

const mapDispatchToProps = (dispatch) => ({
    refreshToken: bindActionCreators(refreshToken, dispatch),
    initBaseUrl: bindActionCreators(initBaseUrl, dispatch),
    logout: bindActionCreators(logoutAndRedirect, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
