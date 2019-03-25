import React, {Component} from 'react';
import {connect} from 'react-redux'
import './registration.css';
import {validate} from "../../utils/validation";
import {ReactComponent as RegistrationSvg} from "../../svg/registration.svg"
import Vivus from "vivus";
import DrawnButton from "../../components/DrawnButton";
import DrawnTextField from "../../components/DrawnTextField";
import {Redirect} from "react-router-dom";
import Error from "../error/Error";
import Overlay from "../overlay/Overlay";
import Wrapper from "../Wrapper";
import {bindActionCreators} from "redux";
import {registration} from "../../actions/auth";

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
        new Vivus('register-svg', {duration: 100}, () => {});
    }

    singUp() {
        this.props.registration(this.state.username, this.state.password, this.state.email)
    }

    renderForm() {
        if (this.props.registrationData.isRegistered === true) {
            return <Redirect to={'/'}/>;
        }

        if (this.props.registrationData.isRegistering === true) {
            return (
                <div className={'register-form'}>
                    <Overlay/>
                </div>)
        }

        return (
            <div className={'register-form-main'}>
                <div style={{width: 582}}>
                    <div className={'register-form'}>
                        <RegistrationSvg id={'register-svg'}
                                         width={'100%'}
                                         height={'100%'}
                                         style={{position: 'absolute', top: 0, left: 0}}
                                         preserveAspectRatio={"none"}
                        />
                        <div className={'form-body'}>
                            <div style={{marginTop: 120, marginLeft: 30}}>
                                <DrawnTextField
                                    label={'Username'}
                                    required
                                    fullWidth={true}
                                    value={this.state.username}
                                    error={!!validate('username', this.props.registrationData.errors)}
                                    helperText={validate('username', this.props.registrationData.errors)}
                                    onChange={(value) => this.setState({username: value})}
                                />
                            </div>
                            <div style={{marginTop: 40, marginLeft: 30}}>
                                <DrawnTextField
                                    label={'Password'}
                                    required
                                    fullWidth={true}
                                    value={this.state.password}
                                    type="password"
                                    error={!!validate('password', this.props.registrationData.errors)}
                                    helperText={validate('password', this.props.registrationData.errors)}
                                    onChange={(value) => this.setState({password: value})}
                                />
                            </div>
                            <div style={{marginTop: 40, marginLeft: 30}}>
                                <DrawnTextField
                                    label={'Email'}
                                    required
                                    fullWidth={true}
                                    value={this.state.email}
                                    error={!!validate('email', this.props.registrationData.errors)}
                                    helperText={validate('email', this.props.registrationData.errors)}
                                    onChange={(value) => this.setState({email: value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'register-buttons-block'}>
                        <DrawnButton onClick={() => this.singUp()}>Sing Up</DrawnButton>
                    </div>
                    {!!this.props.registrationData.globalError ?
                        <Error id={'errors'} style={{clear: 'right'}}
                               error={this.props.registrationData.globalError}/> : null}
                </div>
            </div>
        );
    }

    render() {
        return (<Wrapper components={this.renderForm()}/>)
    }
}

const mapStateToProps = state => ({
    registrationData: !!state.auth ? state.auth.registration : {}
});

const mapDispatchToProps = dispatch => ({
    registration: bindActionCreators(registration, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);
