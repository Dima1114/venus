import React, {Component} from "react";
import Vivus from "vivus";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typing from "react-typing-animation";
import {bindActionCreators} from "redux";
import {getEntityListAll} from "../actions/core";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import DrawnPaper from "./DrawnPaper";
import {Line} from "./styledElements";

class DrawnSelectField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            keyProp: this.props.keyProp || 'id',
            valueProp: this.props.valueProp || 'value'
        }
    }

    componentWillMount() {
        if (!this.props.list) {
            this.props.getEntityListAll(this.props.store, this.props.entities, this.props.paramName);
        }
    }

    componentDidMount() {
        new Vivus(this.props.id, {duration: 50}, () => {
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    renderChildren() {
        const items = [
            <MenuItem key={null} value={null}>
                {null}
            </MenuItem>
        ];
        if (!!this.props.list) {
            this.props.list.forEach(option => {
                    items.push(
                        <MenuItem key={option[this.state.keyProp]} value={option[this.state.valueProp]}>
                            <Typing speed={10} hideCursor={true}>{option[this.state.valueProp] || ''}</Typing>
                        </MenuItem>);
                }
            );
        }
        return items;
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                <TextField select
                           value={this.state.value}
                           onChange={this.handleChange.bind(this)}
                           label={!!this.props.label ?
                               <Typing speed={10} hideCursor={true}>{this.props.label}</Typing> : null}
                           style={{minWidth: 195}}
                           InputProps={{
                               disableUnderline: true,
                           }}
                           SelectProps={{
                               MenuProps: {
                                   TransitionComponent: Fade,
                                   PaperProps: {
                                       component: DrawnPaper
                                   }
                               },
                           }}
                >
                    {this.renderChildren()}
                </TextField>
                <Line id={this.props.id}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    list: !!state.core[props.store] ? state.core[props.store].list : null
});
const mapDispatchToProps = (dispatch) => ({
    getEntityListAll: bindActionCreators(getEntityListAll, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnSelectField);

