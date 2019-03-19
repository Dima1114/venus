import React from "react";
import {connect} from "react-redux";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {bindActionCreators} from "redux";
import {getEntityList, saveEntityList} from "../actions/core";
import Overlay from "../vews/overlay/Overlay";
import DrawnCheckbox from "./DrawnCheckbox";
import DrawnTableToolBar from "./DrawnTableToolBar";
import {ReactComponent as TableSvg} from "../svg/table.svg"
import Vivus from "vivus";

//TODO add pagination
//TODO add checkboxes logic
//TODO add drawn frame
class DrawnList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'table-' + Math.random().toString(36).substring(2, 15),
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
        if (!!this.props.list) {
            new Vivus(this.state.id, {type: 'sync', duration: 30}, () => {
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!!this.props.list && !prevProps.list) {
            new Vivus(this.state.id, {type: 'sync', duration: 30}, () => {
            });
        }
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
            this.setState({selected: this.props.list.map(it => it.id)})
        } else {
            this.setState({selected: []})
        }
    };

    //TODO it should be ID or some other field
    selectItem = (item, event) => {
        if (!!this.props.onSelect) {
            this.props.onSelect(item, event);
        }
        if (event.target.checked === true) {
            this.setState({selected: [...this.state.selected, item.id]})
        } else {
            const index = this.state.selected.indexOf(item.id);
            if (index !== -1) {
                const arr = [...this.state.selected];
                arr.splice(index, 1);
                this.setState({selected: arr})
            }
        }

    };

    isSelected = item => {
        return this.state.selected.indexOf(item.id) !== -1;
    };

    complete() {

        const completed = this.state.selected.map(id => {
            const value = this.props.completePattern;
            value.id = id;
            return value;
        });

        this.props.saveEntityList(this.props.storeName, this.props.entities, '/search/setStatus', {id: this.state.selected, status: 'COMPLETED'},
            this.props.paramName || this.props.entities, this.props.params)
    }

    delete() {
        const deleted = this.state.selected.map(id => {
            const value = this.props.deletePattern;
            value.id = id;
            return value;
        });

        this.props.saveEntityList(this.props.storeName, this.props.entities, {batch: [...deleted]},
            this.props.paramName || this.props.entities, this.props.params)
    }

    createTableHead() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell style={{align: 'center'}}>
                        <DrawnCheckbox onChange={event => this.selectAll(event)}/>
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
                    <DrawnCheckbox onChange={event => this.selectItem(item, event)}
                                   defaultValue={this.isSelected(item)}
                                   checked={this.isSelected(item)}
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
            <div style={style.root}>
                {!!this.props.list ?
                    <div style={style.child}>
                        <TableSvg id={this.state.id}
                                  style={{position: 'absolute', top: 0, left: 0}}
                                  viewBox='0 0 500 510'
                                  preserveAspectRatio="none"
                                  width="100%"
                                  height="100%"
                        />
                        {!!this.props.toolBar ?
                            <DrawnTableToolBar name={this.props.title}
                                               numSelected={this.state.selected.length}
                                               complete={() => this.complete()}
                                               delete={() => this.delete()}
                            />
                            : null}
                        <Table>
                            {this.createTableHead()}
                            <TableBody>
                                {this.props.list.map((item, index) => (this.createTableRow(item, index)))}
                            </TableBody>
                        </Table>
                    </div>
                    : <Overlay/>}
            </div>
        )
    }
}

const style = {
    root: {
        position: 'relative',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    child: {
        width: '100%'
    }
};

const mapStateToProps = (state, props) => ({
    list: !!state.core[props.storeName] ? state.core[props.storeName].list : null
});
const mapDispatchToProps = (dispatch) => ({
    getEntityList: bindActionCreators(getEntityList, dispatch),
    saveEntityList: bindActionCreators(saveEntityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnList);