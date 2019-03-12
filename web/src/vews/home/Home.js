import React from 'react';
import {connect} from 'react-redux'
import Typing from "react-typing-animation";
import { ReactComponent as Gear } from '../../svg/big-gear.svg';

class Home extends React.Component {

    render() {
        return (
            <div className={'app-body'} style={{fontSize: 40}}>
                <Typing speed={1} hideCursor={true}>
                    <h1>Welcome to TODO List application</h1>
                </Typing>

                <Gear viewBox="0 0 600 600" width="150" height={'auto'}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);