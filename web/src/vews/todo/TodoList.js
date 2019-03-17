import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import $ from "jquery";
import {bindActionCreators} from "redux";
import {getEntityList} from "../../actions/core";
import ToDoFilter from "./ToDoFilter";
import DrawnList from "../../components/DrawnList";

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
            url: '/customers/insurances/export',
            contentType: 'application/json',
            xhrFields: {responseType: 'arraybuffer'},
            headers: {
                "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c3IiOiJhZG1pbiIsImV4cCI6MTU1MjYzMjY2NX0.HmwSi4JXKP1l28bPofkHA0HI9xhBfTnYVPmKsD8JlYw'
            }
        }).then(response => {
            const fileName = "customers.xlsx";
            const link = document.createElement("a");
            const file = new Blob([response]);
            if (window.navigator.msSaveOrOpenBlob) { // IE10+
                window.navigator.msSaveOrOpenBlob(file, fileName);
            } else {
                link.href = URL.createObjectURL(file);
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        }).catch(error => {
            const message = error.responseJSON || error.responseText || error;
            console.log(message);
        })

    }

    getTodos() {
        this.props.getEntityListAll('todos', 'tasks')
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

        const rows = [
            {id:1, label:'Id', value:'id'},
            {id: 2, label: 'Title', value: 'title'},
            {id: 2, label: 'Comment', value: 'comment'},
            {id: 2, label: 'Type', value: 'type'},
            {id: 2, label: 'Status', value: 'status'},
        ];

        return (
            <div className={'app-body'}>

                <ToDoFilter id={'todo-filter'}/>

                <div className={'app-body'}>

                    <DrawnList storeName={'tasks'}
                               entities={'tasks'}
                               params={{projection: 'info'}}
                               isSelected={item => item.status === 'COMPLETED'}
                               rows={rows}/>
                </div>

                {/*<SimpleLink to={'/'}>*/}
                {/*<DrawnButton id={'tomain'}>To Main</DrawnButton>*/}
                {/*</SimpleLink>*/}
                {/*<DrawnTextField id={'new'}*/}
                {/*label={'new task'}*/}
                {/*value={this.state.task}*/}
                {/*onChange={e => this.setState({task: e.target.value})}*/}
                {/*/>*/}
                {/*<DrawnButton id={'GET XSLS FILE'}*/}
                {/*onClick={this.onclick.bind(this)}>GET XSLS FILE</DrawnButton>*/}
                {/*<DrawnButton id={'todos'}*/}
                {/*onClick={this.getTodos.bind(this)}>get todos</DrawnButton>*/}
                {/*<DrawnButton id={'users'}*/}
                {/*onClick={this.getUsers.bind(this)}>get users</DrawnButton>*/}
                {/*<DrawnButton id={'enums'}*/}
                {/*onClick={this.getEnums.bind(this)}>get enums</DrawnButton>*/}
                {/*{!!this.props.list ? this.props.list.map((el, i) => <p key={'el_' + i}>{el.text}</p>) : null}*/}


            </div>
        )
    }


}

const mapStateToProps = state => ({
    auth: state.authReducer,
    baseUrl: state.initBaseUrl.baseUrl
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text)),
    getEntityListAll: bindActionCreators(getEntityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);