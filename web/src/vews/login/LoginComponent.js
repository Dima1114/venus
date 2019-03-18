import React, {Component} from 'react';
import {connect} from 'react-redux'
import './login.css';
import {login} from "../../actions/auth";
import {validate} from "../../utils/validation";
import loginSvg from "../../svg/login.svg";
import Vivus from "vivus";
import DrawnButton from "../../components/DrawnButton";
import DrawnTextField from "../../components/DrawnTextField";
import {Redirect} from "react-router-dom";
import Error from "../error/Error";
import Overlay from "../overlay/Overlay";
import Wrapper from "../Wrapper";

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
            new Vivus('login-svg', {duration: 100, file: loginSvg}, () => {});
        }
    }

    onclick() {
        this.props.login(this.state.username, this.state.password);
    }

    //TODO forgot password
    renderForm() {

        if (this.props.auth.isAuthenticated === true) {
            return <Redirect to={'/'}/>;
        }

        if (this.props.auth.isAuthenticating === true) {
            return (
                <div className={'login-form'}>
                    <Overlay/>
                </div>)
        }

        return (
            <div className={'login-form-main'}>
                <div style={{width: 582}}>
                    <div className={'form'}>
                        <div id={'login-svg'}/>
                        <div className={'form-body'}>
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
                        <DrawnButton onClick={() => this.onclick()}>Submit</DrawnButton>
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

    render() {
        return(<Wrapper components={this.renderForm()}/>)
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
