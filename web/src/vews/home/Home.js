import React from 'react';
import {connect} from 'react-redux'
import Typing from "react-typing-animation";

class Home extends React.Component {

    render() {
        return (
            <div className={'app-body'} style={{fontSize: 40}}>
                <Typing speed={1} hideCursor={true}>
                    <h1>Welcome to TODO List application</h1>
                </Typing>
                {this.props.isRegistered === true && this.props.auth.isAuthenticated === false &&
                    <div>
                        <p style={{fontSize: 30}}>Email with registration link was sent to your email '{this.props.registration.email}'</p>
                        <p style={{fontSize: 30}}>Please complete the registration within the next 24 hours</p>
                    </div>}
                {this.props.isRegistered === true && this.props.auth.isAuthenticated === true &&
                <div>
                    <p style={{fontSize: 30}}>Congratulations! You`he completed registration successfully</p>
                    <p style={{fontSize: 30}}>Thank you for using our service</p>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    isRegistered: !!state.auth.registration ? state.auth.registration.isRegistered : false,
    registration: state.auth.registration
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);