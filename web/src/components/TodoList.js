import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../actions";
import {RaisedButton, TextField} from "material-ui";
import $ from "jquery";
import {Link} from "react-router-dom";


class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: ''
        }
    }

    onclick() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/rest/hello',
            dataType: 'json',
        }).then(response => {
            console.log(response);
        }).catch(error => {
            const message = error.responseJSON || error.responseText || error;
            console.log(message);
        })

    }

    getTodos(){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/tasks?projection=info',
            dataType: 'json',
        }).then(response => {
            console.log(response);
        }).catch(error => {
            const message = error.responseJSON || error.responseText || error;
            console.log(message);
        })
    }

    render() {
        return (
            <div className={'app-body'}>
                <TextField hintText={'new task'}
                           value={this.state.task}
                           onChange={(e, val) => this.setState({task: val})}
                />
                <RaisedButton label={'Add'}
                              onClick={this.onclick.bind(this)}/>
                <RaisedButton label={'get todos'}
                              onClick={this.getTodos.bind(this)}/>
                {!!this.props.list ? this.props.list.map((el, i) => <p key={'el_' + i}>{el.text}</p>) : null}

                <Link to={'/'}>
                    <RaisedButton label={'To Main'}/>
                </Link>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    auth: state.loginReducer,
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);