import React from "react";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {bindActionCreators} from "redux";
import {getEntityList} from "../actions/core";
import Overlay from "../vews/overlay/Overlay";
import DrawnCheckbox from "./DrawnCheckbox";

//TODO add pagination
//TODO add checkboxes logic
//TODO add drawn frame
class DrawnList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: []
        }
    }

    componentWillMount() {
        if (!this.props.list) {
            this.props.getEntityList(this.props.storeName, this.props.entities,
                this.props.paramName || this.props.entities, this.props.params)
        }
        this.initSelects(this.props);
    }

    componentDidMount() {
        // new Vivus(this.state.id, {type: 'sync', duration: 50}, () => {});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.initSelects(nextProps);
    }

    initSelects(props) {
        if (!!props.list && !!props.isSelected) {
            this.setState({selected: props.list.filter(it => this.props.isSelected(it)).map(it => it.id)})
        }
    }

    selectAll = (event) => {
        if (event.target.checked === true) {
            console.log('SELECT ALL');
            console.log(this.props.list.map(it => it.id));
            this.setState({selected: this.props.list.map(it => it.id)})
        } else {
            this.setState({selected: []})
        }
    };

    //TODO it should be ID or some other field
    selectItem = (item, event) => {

        console.log('SELECT ITEM: ' + item.id);
        if (!!this.props.onSelect) {
            this.props.onSelect(item, event);
        }
        if (event.target.checked === true) {
            this.setState({selected: [...this.state.selected, item.id]})
        } else {
            const index = this.state.selected.indexOf(item.id);
            if (index !== -1) {
                console.log('index = '+index);
                this.setState({selected: this.state.selected.splice(index, 1)})
            }
        }

    };

    isSelected = item => {
        console.log('ITEM: ' + item.id);
        console.log(this.state.selected);
        console.log(this.state.selected.indexOf(item.id) !== -1);
        return this.state.selected.indexOf(item.id) !== -1;
    };

    createTableHead() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell style={{align: 'center'}}>
                        <DrawnCheckbox id={'table-header-checkbox'} onChange={event => this.selectAll(event)}/>
                    </TableCell>
                    {this.props.rows.map((row, i) => (
                        <TableCell key={'head_' + i + '_' + row.id}>{row.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    createTableRow(item, index) {
        return (
            <TableRow key={'row_' + index}>
                <TableCell padding="checkbox">
                    <DrawnCheckbox id={'table-row-checkbox-' + index}
                                   onChange={event => this.selectItem(item, event)}
                                   defaultValue={this.isSelected(item)}
                    />
                </TableCell>
                {this.props.rows.map((row, i) => (
                    <TableCell key={'cell_' + i + '_' + row.id}>{item[row.value]}</TableCell>
                ))}
            </TableRow>
        )
    }

    render() {
        return (
            <Paper elevation={4}>
                {!!this.props.list ?
                    <Table>
                        {this.createTableHead()}
                        <TableBody>
                            {this.props.list.map((item, index) => (this.createTableRow(item, index)))}
                        </TableBody>
                    </Table>
                    : <Overlay/>}
            </Paper>
        )
    }
}

const mapStateToProps = (state, props) => ({
    list: !!state.core[props.storeName] ? state.core[props.storeName].list : null
});
const mapDispatchToProps = (dispatch) => ({
    getEntityList: bindActionCreators(getEntityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnList);