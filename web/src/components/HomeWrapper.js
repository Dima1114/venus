import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from "jquery";
import logo from "../logo.svg";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import TodoList from "../components/TodoList";
import {RaisedButton} from "material-ui";
import {initBaseUrl} from "../actions";
import {logoutAndRedirect, refreshToken} from "../actions/auth";
import {bindActionCreators} from "redux";

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

    refreshTokenOnReload(baseUrl){
        const refreshToken = localStorage.getItem('refreshToken');
        if(!this.props.auth.isAuthenticated && !!refreshToken){
            this.props.refreshToken(baseUrl, refreshToken)
        }
    }

    refreshCountDown(props){
        if(props.auth.isAuthenticated && !!props.auth.expTime){
            const timeOut = props.auth.expTime * 1000 - new Date().getTime() - 60000;
            const refreshTimer = setTimeout(
                () => this.props.refreshToken(this.props.baseUrl, props.auth.refreshToken), timeOut);
            this.setState({refreshTimer: refreshTimer})
        }
    }

    clearRefreshCountDown(props){
        if(props.auth.isAuthenticated === false){
            clearTimeout(this.state.refreshTimer);
            this.setState({refreshTimer: null})
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div>
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <div className={'App-nav'}>
                                <Link to={'/login'}>
                                    <RaisedButton label={'Login'}/>
                                </Link>
                                <span style={{marginLeft: 10}}/>
                                <Link to={'/todo'}>
                                    <RaisedButton label={'Todo'}/>
                                </Link>
                                {this.props.auth.isAuthenticated ?
                                    <div>
                                        <span style={{marginLeft: 10}}/>
                                        <RaisedButton label={'Logout'}
                                                      onClick={() => this.props.logout(this.props.baseUrl)}/>
                                    </div>
                                    : null}

                            </div>

                        </div>

                        <Switch>
                            <Route exact path={'/login'} component={LoginComponent}/>
                            <Route path={'/todo'} component={TodoList}/>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
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
