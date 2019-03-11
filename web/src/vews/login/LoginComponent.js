import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../../App.css';
import {login} from "../../actions/auth";
import {validate} from "../../utils/validation";
import loginSvg from "../../svg/login.svg";
import Vivus from "vivus";
import DrawnButton from "../../elements/DrawnButton";
import DrawnTextField from "../../elements/DrawnTextField";
import {Redirect} from "react-router-dom";
import Error from "../error/Error";
import Overlay from "../overlay/Overlay";

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticating === false && this.props.auth.isAuthenticated === false) {
            new Vivus('my-svg', {duration: 100, file: loginSvg}, () => {
            });
        }
    }

    onclick() {
        this.props.login(this.state.username, this.state.password);
    }

    render() {

        if (this.props.auth.isAuthenticated === true) {
            return <Redirect to={'/'}/>;
        }

        if (this.props.auth.isAuthenticating === true) {
            return (
                <div className={'app-body  login-form flower'}>
                    <Overlay/>
                </div>)
        }

        return (
            <div className={'app-body  login-form flower'}>
                <div style={{width: 582}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 20,
                        height: 402,
                        position: 'relative'
                    }}>
                        <div id={'my-svg'} style={{width: 582, height: 402, position: 'absolute'}}/>
                        <div style={{width: 300, margin: '0 auto'}}>
                            <div style={{marginTop: 100, marginLeft: 30}}>
                                <DrawnTextField
                                    id={'username'}
                                    label={'Username'}
                                    fullWidth={true}
                                    value={this.state.username}
                                    error={!!validate('username', this.props.auth.errors)}
                                    helperText={validate('username', this.props.auth.errors)}
                                    onChange={(event) => this.setState({username: event.target.value})}
                                />
                            </div>
                            <div style={{marginTop: 60, marginLeft: 30}}>
                                <DrawnTextField
                                    id={'password'}
                                    label={'Password'}
                                    fullWidth={true}
                                    value={this.state.password}
                                    type="password"
                                    error={!!validate('password', this.props.auth.errors)}
                                    helperText={validate('password', this.props.auth.errors)}
                                    onChange={(event) => this.setState({password: event.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{float: 'right'}}>
                        <DrawnButton id={'login-button'}
                                     onClick={() => this.onclick()}>Submit</DrawnButton>
                    </div>
                    {
                        !!this.props.auth.globalError ?
                            <Error id={'errors'} style={{clear: 'right'}} error={this.props.auth.globalError}/> : null
                    }
                </div>


            </div>
        )
            ;
    }
}

const mapStateToProps = state => ({
    baseUrl: state.initBaseUrl.baseUrl,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    login: (u, p) => dispatch(login(u, p))

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
