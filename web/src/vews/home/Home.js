import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";


class Home extends React.Component {

    render() {
        return (
            <div className={'app-body'} style={{fontSize: 40}}>
                <h1>Welcome to TODO List application</h1>
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