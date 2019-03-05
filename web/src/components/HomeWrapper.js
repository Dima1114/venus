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
        this.setUp(this.props);
    }

    componentWillReceiveProps(nextProps, nextContent) {
        this.refreshCountDown(nextProps);
        this.clearRefreshCountDown(nextProps);
        this.setUp(nextProps);
    }

    setUp(props) {
        if (!!props.auth.accessToken) {
            $.ajaxSetup({
                headers: {
                    "X-Auth": 'Bearer ' + props.auth.accessToken
                }
            })
        }
    }

    refreshTokenOnReload(baseUrl) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!this.props.auth.isAuthenticated && !!refreshToken) {
            this.props.refreshToken(baseUrl, refreshToken);
        }
    }

    refreshCountDown(props) {
        if (props.auth.isAuthenticated && !!props.auth.expTime) {
            const timeOut = props.auth.expTime * 1000 - new Date().getTime() - 60000;
            console.log(timeOut);
            const refreshTimer = setTimeout(
                () => this.props.refreshToken(this.props.baseUrl, props.auth.refreshToken), timeOut);
            this.setState({refreshTimer: refreshTimer});
        }
    }

    clearRefreshCountDown(props) {
        if (props.auth.isAuthenticated === false) {
            clearTimeout(this.state.refreshTimer);
            this.setState({refreshTimer: null});
        }
    }

    render() {
        return (
            <div className={"wrapper"}>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className={'App-nav'}>

                        {this.props.auth.isAuthenticated ?
                            <SimpleLink to={'/todo'}>
                                <DrawnButton id={'todo'}>Todo</DrawnButton>
                            </SimpleLink>
                            : null}

                        <span style={{marginLeft: 10}}/>

                        {this.props.auth.isAuthenticated ?
                            <DrawnButton id={'logout'}
                                         onClick={() => this.props.logout(this.props.baseUrl)}>Logout</DrawnButton>
                            :
                            <SimpleLink to={'/login'}>
                                <DrawnButton id={'login'}>Login</DrawnButton>
                            </SimpleLink>}
                    </div>

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
    auth: state.authReducer,
    baseUrl: state.initBaseUrl.baseUrl,

});

const mapDispatchToProps = (dispatch) => ({
    refreshToken: bindActionCreators(refreshToken, dispatch),
    initBaseUrl: bindActionCreators(initBaseUrl, dispatch),
    logout: bindActionCreators(logoutAndRedirect, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeWrapper));
