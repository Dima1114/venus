import React, {Component} from 'react';
import {connect} from 'react-redux'
import './registration.css';
import {register} from "../../actions/auth";
import {validate} from "../../utils/validation";
import registerSvg from "../../svg/register.svg";
import Vivus from "vivus";
import DrawnButton from "../../components/DrawnButton";
import DrawnTextField from "../../components/DrawnTextField";
import {Redirect} from "react-router-dom";
import Error from "../error/Error";
import Overlay from "../overlay/Overlay";
import Wrapper from "../Wrapper";

class RegistrationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticating === false && this.props.auth.isAuthenticated === false) {
            new Vivus('registration-svg', {duration: 100, file: registerSvg}, () => {});
        }
    }

    onclick() {
        this.props.register(this.state.username, this.state.password);
    }

    renderForm() {

        if (this.props.auth.isAuthenticated === true) {
            return <Redirect to={'/'}/>;
        }

        if (this.props.auth.isAuthenticating === true) {
            return (
                <div className={'register-form'}>
                    <Overlay/>
                </div>)
        }

        return (
            <div className={'register-form-main'}>
                <div style={{width: 582}}>
                    <div className={'form'}>
                        <div id={'register-svg'}/>
                        <div className={'form-body'}>
                            <div style={{marginTop: 100, marginLeft: 30}}>
                                <DrawnTextField
                                    label={'Username'}
                                    required
                                    fullWidth={true}
                                    value={this.state.username}
                                    error={!!validate('username', this.props.auth.errors)}
                                    helperText={validate('username', this.props.auth.errors)}
                                    onChange={(value) => this.setState({username: value})}
                                />
                            </div>
                            <div style={{marginTop: 60, marginLeft: 30}}>
                                <DrawnTextField
                                    label={'Password'}
                                    required
                                    fullWidth={true}
                                    value={this.state.password}
                                    type="password"
                                    error={!!validate('password', this.props.auth.errors)}
                                    helperText={validate('password', this.props.auth.errors)}
                                    onChange={(value) => this.setState({password: value})}
                                />
                            </div>
                            <div style={{marginTop: 60, marginLeft: 30}}>
                                <DrawnTextField
                                    label={'Email'}
                                    required
                                    fullWidth={true}
                                    value={this.state.email}
                                    error={!!validate('email', this.props.auth.errors)}
                                    helperText={validate('email', this.props.auth.errors)}
                                    onChange={(value) => this.setState({email: value})}
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
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    register: (u, p) => dispatch(register(u, p))

});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);
