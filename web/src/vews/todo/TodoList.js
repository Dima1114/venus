import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import $ from "jquery";
import DrawnButton from "../../components/DrawnButton";
import {SimpleLink} from "../../components/styledElements";
import {bindActionCreators} from "redux";
import {getEntityListAll} from "../../actions/core";
import ToDoFilter from "./ToDoFilter";
import Overlay from "../overlay/Overlay";


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
            dataType: 'json',
            xhrFields : { responseType : 'arraybuffer' },
            headers: {
                "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c3IiOiJhZG1pbiIsImV4cCI6MTU1MjU1Nzg5OH0.jB1eopzQIjFVUd9hJeh-Nm5EIzTTko2TX8SBrPxgeuA'
            }
        }).then(response => {
            console.log(response);
            const a = document.createElement("a");
            const file = new Blob([response], {type: "application/octet-stream"});
            const fileName = "customers";
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, fileName);
            else {
                const url = URL.createObjectURL(file);
                a.href = url;
                a.download = fileName + ".pdf";
                document.body.appendChild(a);
                a.click();
                setTimeout(function () {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
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
        return (
            <div className={'app-body'}>

                <ToDoFilter id={'todo-filter'}/>

                <div className={'app-body'}>
                    <h2>Sorry, This section is under construction process</h2>
                    <Overlay/>
                    <SimpleLink to={'/'}>
                        <DrawnButton id={'tomain'}>To Main</DrawnButton>
                    </SimpleLink>
                </div>

                {/*<DrawnTextField id={'new'}*/}
                                {/*label={'new task'}*/}
                                {/*value={this.state.task}*/}
                                {/*onChange={e => this.setState({task: e.target.value})}*/}
                {/*/>*/}
                <DrawnButton id={'GET XSLS FILE'}
                             onClick={this.onclick.bind(this)}>GET XSLS FILE</DrawnButton>
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
    getEntityListAll: bindActionCreators(getEntityListAll, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);