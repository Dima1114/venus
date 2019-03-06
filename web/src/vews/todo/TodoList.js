import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import $ from "jquery";
import DrawnButton from "../../elements/DrawnButton";
import DrawnTextField from "../../elements/DrawnTextField";
import {SimpleLink} from "../../elements/styledElements";


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
            url: this.props.baseUrl + '/rest/hello',
            dataType: 'json',
        }).then(response => {
            console.log(response);
        }).catch(error => {
            const message = error.responseJSON || error.responseText || error;
            console.log(message);
        })

    }

    getTodos() {
        $.ajax({
            type: 'GET',
            url: this.props.baseUrl + '/tasks',
            dataType: 'json',
        }).then(response => {
            console.log(response);
        }).catch(error => {
            const message = error.responseJSON || error.responseText || error;
            console.log(message);
        })
    }

    getUsers() {
        $.ajax({
            type: 'GET',
            url: this.props.baseUrl + '/users?email:isNotNull',
            dataType: 'json',
        }).then(response => {
            console.log(response);
        }).catch(error => {
            const message = error.responseJSON || error.responseText || error;
            console.log(message);
        })
    }

    getEnums() {
        $.ajax({
            type: 'GET',
            url: this.props.baseUrl + '/api/enums/taskType',
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

                <DrawnTextField id={'new'}
                                label={'new task'}
                                value={this.state.task}
                                onChange={e => this.setState({task: e.target.value})}
                />
                <DrawnButton id={'Add'}
                             onClick={this.onclick.bind(this)}>Add</DrawnButton>
                <DrawnButton id={'todos'}
                             onClick={this.getTodos.bind(this)}>get todos</DrawnButton>
                <DrawnButton id={'users'}
                             onClick={this.getUsers.bind(this)}>get users</DrawnButton>
                <DrawnButton id={'enums'}
                             onClick={this.getEnums.bind(this)}>get enums</DrawnButton>
                {!!this.props.list ? this.props.list.map((el, i) => <p key={'el_' + i}>{el.text}</p>) : null}

                <SimpleLink to={'/'}>
                    <DrawnButton id={'tomain'}>To Main</DrawnButton>
                </SimpleLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);