import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from "../themeDefault";
import React, {Component} from "react";
import Vivus from "vivus";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";

const muiTheme = getMuiTheme(DefaultTheme);

class DrawnTextField extends Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 150}, () => {
        });
    }

    render() {
        const {id, inputProps, inputLabelProps, ...props} = this.props;
        return (
            <div style={{position: 'relative'}}>
                <TextField {...props}
                           InputProps={{
                               ...inputProps,
                               disableUnderline: true,
                               inputProps: {
                                   style: {height: 25, fontFamily: muiTheme.typography.fontFamily}
                               }
                           }}
                           InputLabelProps={{...inputLabelProps, style: {fontFamily: muiTheme.typography.fontFamily}}}
                />
                {svg(id)}
            </div>
        )
    }
}

const svg = (id) => (
    <svg
        id={id}
        style={{position: 'absolute', left: 0, top: 48}}
        viewBox='10 0 100 70'
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Layer 1</title>
            <line strokeLinecap="null" strokeLinejoin="null" id="svg_10" y2="4.397598" x2="496.18419" y1="4.397598"
                  x1="2.610981" fillOpacity="null" strokeOpacity="null" strokeWidth="7" stroke="#000" fill="none"/>
        </g>
    </svg>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnTextField);


