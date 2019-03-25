import React, {Component} from 'react';
import {connect} from 'react-redux'
import './login.css';
import {login} from "../../actions/auth";
import {validate} from "../../utils/validation";
import {ReactComponent as LoginSvg} from "../../svg/login.svg"
import Vivus from "vivus";
import DrawnButton from "../../components/DrawnButton";
import DrawnTextField from "../../components/DrawnTextField";
import {Redirect} from "react-router-dom";
import Error from "../error/Error";
import Overlay from "../overlay/Overlay";
import Wrapper from "../Wrapper";
import {Space} from "../../components/styledElements";
import Link from '@material-ui/core/Link';
import ForgotPassword from "./ForgotPassword";

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            forgotPassword: false,
            username: '',
            password: '',
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticating === false && this.props.auth.isAuthenticated === false) {
            new Vivus('login-svg', {duration: 100}, () => {});
        }
    }

    login() {
        this.props.login(this.state.username, this.state.password);
    }

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
                    <div className={'login-form'}>
                        <LoginSvg id={'login-svg'}
                                  width={'100%'}
                                  height={'100%'}
                                  style={{position: 'absolute', top: 0, left: 0}}
                                  preserveAspectRatio={"none"}
                        />
                        <div className={'form-body'}>
                            <div style={{marginTop: 100, marginLeft: 30}}>
                                <DrawnTextField
                                    id={'username'}
                                    label={'Username'}
                                    fullWidth={true}
                                    value={this.state.username}
                                    error={!!validate('username', this.props.auth.errors)}
                                    helperText={validate('username', this.props.auth.errors)}
                                    onChange={(value) => this.setState({username: value})}
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
                                    onChange={(value) => this.setState({password: value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{float: 'right', display: 'flex'}}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => this.setState({forgotPassword: true})}>
                            Forgot password?
                        </Link>
                        <Space margin={50}/>
                        <DrawnButton onClick={() => this.login()}>Submit</DrawnButton>
                    </div>
                    {
                        !!this.props.auth.globalError ?
                            <Error id={'errors'} style={{clear: 'right'}} error={this.props.auth.globalError}/> : null
                    }
                </div>
                <ForgotPassword open={this.state.forgotPassword} handleClose={() => this.setState({forgotPassword: false})}/>
            </div>
        )
            ;
    }

    render() {
        return(<Wrapper components={this.renderForm()}/>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    login: (u, p) => dispatch(login(u, p))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
