import React, {Component} from "react";
import Vivus from "vivus";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typing from "react-typing-animation";
import {bindActionCreators} from "redux";
import {getEntityList} from "../actions/core";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import DrawnPaper from "./DrawnPaper";
import {Line} from "./styledElements";

class DrawnSelectField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'select-' + Math.random().toString(36).substring(2, 15),
            value: this.props.defaultValue || [],
            keyProp: this.props.keyProp || 'id',
            valueProp: this.props.valueProp || 'value'
        }
    }

    componentWillMount() {
        if (!this.props.list) {
            this.props.getEntityListAll(this.props.storeName, this.props.entities, this.props.paramName);
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {duration: 50}, () => {
        });
    }

    handleChange(event) {

        if(!!this.props.onChange){
            this.props.onChange(event.target.value)
        }
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    renderValue(value){
        if(this.props.multiple === true){
            return(<span>{value.join(', ')}</span>)
        }else{
            return( <span>{value}</span>)
        }
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

    //TODO popup menu slightly wider than drawn frame. do something, dude
    render() {
        return (
            <div style={{position: 'relative'}}>
                <TextField select
                           multiple={true}

                           onChange={this.handleChange.bind(this)}
                           label={!!this.props.label ?
                               <Typing speed={10} hideCursor={true}>{this.props.label}</Typing> : null}
                           style={{minWidth: 195}}
                           InputProps={{
                               disableUnderline: true,
                           }}
                           SelectProps={{
                               value: this.state.value,
                               multiple: this.props.multiple || false,
                               renderValue: value => this.renderValue(value),
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
                <Line id={this.state.id}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    list: !!state.core[props.storeName] ? state.core[props.storeName].list : null
});
const mapDispatchToProps = (dispatch) => ({
    getEntityListAll: bindActionCreators(getEntityList, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnSelectField);


