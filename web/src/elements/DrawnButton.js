import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Vivus from "vivus";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from "../themeDefault";

const muiTheme = getMuiTheme(DefaultTheme);

class DrawnButton extends Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 40}, () => {
        });
    }

    render() {
        const {id, ...other} = this.props;
        return (
            <div style={{position: 'relative', height: 48}}>
                {svg(id)}
                <StyledButton {...other} />
            </div>
        )
    }
}

const svg = (id) => (
    <svg id={id}
         style={{position: 'absolute'}}
         width="105%"
         height="100%"
         viewBox='0 0 100 48'
         preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Layer 1</title>
            <line stroke="#000" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_1" y2="48.161476"
                  x2="1.428601" y1="-1.155266" x1="1.428601" strokeWidth="2" fill="none"/>
            <line stroke="#000" strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_3" y2="48.65837"
                  x2="98.5714" y1="-0.658372" x1="98.5714" strokeWidth="2" fill="none"/>
            <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_6" y2="46.795019" x2="100.213746"
                  y1="46.795019" x1="-1.304317" fillOpacity="null" strokeOpacity="null" strokeWidth="2"
                  stroke="#000" fill="none"/>
            <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_7" y2="1.204985" x2="100.462193"
                  y1="1.204985" x1="-1.05587" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="#000"
                  fill="none"/>
        </g>
    </svg>
);

const StyledButton = withStyles({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 44,
        padding: '0 30px',
    },
    label: {
        width: '100%',
        textTransform: 'capitalize',
        fontFamily: muiTheme.typography.fontFamily,
        fontSize: 20,
        textDecoration: 'none'
    },
})(Button);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnButton);