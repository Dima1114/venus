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
        new Vivus(this.props.id, {duration: 40}, () => {});
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
         width="103%"
         height="100%"
         viewBox='0 0 100 48'
         preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg">
        <g>
            <g>
                <title>Layer 1</title>
                <rect stroke="#000" id="svg_2" height="43.249875" width="94.964846" y="2.375063" x="2.53501"
                      fillOpacity="null" strokeOpacity="null" strokeWidth="3" fill="none"/>
            </g>
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
        fontWeight: 600,
        textDecoration: 'none'
    },
})(Button);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnButton);