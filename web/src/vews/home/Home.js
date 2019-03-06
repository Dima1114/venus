import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import Typing from "react-typing-animation";

class Home extends React.Component {

    render() {
        return (
            <div className={'app-body'} style={{fontSize: 40}}>
                <Typing speed={5} hideCursor={true}>
                    <h1>Welcome to TODO List application</h1>
                </Typing>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    baseUrl: state.initBaseUrl.baseUrl
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);