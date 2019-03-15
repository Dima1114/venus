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

//TODO add fonts
//TODO add pagination
//TODO add checkboxes logic
//TODO add drawn frame
class DrawnList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        if (!this.props.list) {
            this.props.getEntityList(this.props.storeName, this.props.entities,
                this.props.paramName || this.props.entities, this.props.params)
        }
    }

    componentDidMount() {
        // new Vivus(this.state.id, {type: 'sync', duration: 50}, () => {});
    }

    createTableHead() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell style={{align: 'center'}}>
                        <DrawnCheckbox id={'table-header-checkbox'}/>
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
                    <DrawnCheckbox id={'table-row-checkbox-' + index}/>
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