import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import $ from "jquery";
import {bindActionCreators} from "redux";
import {getEntityList, saveEntityList} from "../../actions/core";
import ToDoFilter from "./ToDoFilter";
import DrawnList from "../../components/DrawnList";
import Wrapper from "../Wrapper";
import TaskForm from "./TaskForm";
import {format} from 'date-fns/esm'

const store = 'tasks';
const entities = 'tasks';
const defaultParams = {sort: 'dateAdded,desc', projection: 'info', 'status:in': ['ACTIVE', 'OVERDUE']};

class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openForm: false
        }
    }

    onclick() {
        $.ajax({
            type: 'GET',
            url: '/customers/insurances/export',
            contentType: 'application/json',
            xhrFields: {responseType: 'arraybuffer'},
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

    completeAction(selected) {
        this.props.saveEntityList(store, 'tasks/setStatus',
            {id: selected, status: 'COMPLETED', dateComplete: format(new Date(), 'yyyy-MM-dd HH:mm:ss')});
    }

    deleteAction(selected) {
        this.props.saveEntityList(store, 'tasks/setStatus', {id: selected, status: 'IN_BIN'});
    }

    addAction() {
        this.setState({openForm: true})
    }

    renderComponent() {

        const rows = [
            {id: 2, label: 'Title', value: 'title', type: 'string'},
            {id: 2, label: 'Comment', value: 'comment', type: 'string'},
            {id: 2, label: 'Type', value: 'type', type: 'string'},
            {id: 2, label: 'Status', value: 'status', type: 'string'},
            {id: 2, label: 'Due Date', value: 'dueDate', type: 'date', format: 'dd/MM/yyyy'},
        ];

        return (
            <div style={{width: '1000px'}}>
                <ToDoFilter defaultParams={defaultParams}
                            storeName={store}
                            entities={entities}
                            title={'ToDo Filter'}
                />
                <div>
                    <DrawnList storeName={store}
                               entities={entities}
                               params={defaultParams}
                               isSelected={item => item.status === 'COMPLETED'}
                               rows={rows}
                               toolBar
                               completeAction={selected => this.completeAction(selected)}
                               deleteAction={selected => this.deleteAction(selected)}
                               addAction={() => this.addAction()}
                               title={'ToDo List'}
                    />
                </div>
                <TaskForm storeName={store}
                          entities={entities}
                          open={this.state.openForm}
                          handleClose={() => this.setState({openForm: false})}/>

                {/*<DrawnButton id={'GET XSLS FILE'}*/}
                {/*onClick={this.onclick.bind(this)}>GET XSLS FILE</DrawnButton>*/}

            </div>
        )
    }

    render() {
        return (<Wrapper components={this.renderComponent()}/>)
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    baseUrl: state.initBaseUrl.baseUrl
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text)),
    getEntityListAll: bindActionCreators(getEntityList, dispatch),
    saveEntityList: bindActionCreators(saveEntityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);