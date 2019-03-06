import React from "react";
import Typing from "../home/Home";
import {addTodo} from "../../actions";
import {connect} from "react-redux";

class ToDoFilter extends React.Component {

    render() {
        return (
            <div className={'app-body'}>
                

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

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);