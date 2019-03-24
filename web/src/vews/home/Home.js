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
                {this.props.isRegistered === true ?
                    <div>
                        <p style={{fontSize: 30}}>Email with registration link was sent to your email '{this.props.registration.email}'</p>
                        <p style={{fontSize: 30}}>Please complete the registration within the next 24 hours</p>
                    </div>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isRegistered: !!state.registration ? state.registration.isRegistered : false,
    registration: state.registration
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);