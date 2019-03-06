import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from "../themeDefault";
import React, {Component} from "react";
import Vivus from "vivus";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typing from "react-typing-animation";
import {bindActionCreators} from "redux";
import {getEntityListAll} from "../actions/core";

const muiTheme = getMuiTheme(DefaultTheme);

class DrawnSelectField extends Component {

    constructor(props){
        super(props);

        this.state={
            children: null
        }
    }

    componentWillMount() {
        this.props.getEntityListAll(this.props.baseUrl, )
    }

    componentDidMount() {
        new Vivus(this.props.id, {duration: 100}, () => {
        });
    }

    render() {
        const {id, helperText, ...props} = this.props;
        return (
            <div style={{position: 'relative'}}>
                <TextField {...props}
                           select
                           helperText={!!helperText ? <Typing speed={10} hideCursor={true}>{helperText}</Typing> : null}
                >
                    {this.state.children}
                </TextField>
                {svg(id)}
            </div>
        )
    }
}

const svg = (id) => (
    <svg
        id={id}
        style={{position: 'absolute', left: 0, top: 48}}
        viewBox='10 0 500 50'
        preserveAspectRatio="none"
        width="100%"
        height="50px"
        xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Layer 1</title>
            <path
                d="m5.5,9.437512c1,0 3,0 7,0c8,0 20,0 40,0c41,0 76,1 142,1c53,0 105.002136,-0.888935 160,-2c45.001923,-0.909126 85,-2 116,-2c24,0 38,0 43,0c5,0 9,0 11,0c1,0 4,0 8,0c5,0 10,0 17,0c1,0 4,-1 5,-1c2,0 3,0 4,0c3,0 6,0 10,0c2,0 3,0 4,0l1,-1"
                id="svg_5" fillOpacity="null" strokeOpacity="null" strokeWidth="4" stroke="#000" fill="none"/>
        </g>
    </svg>
);

const mapStateToProps = (state) => ({
    baseUrl: state.initBaseUrl.baseUrl
});
const mapDispatchToProps = (dispatch) => ({
    getEntityListAll: bindActionCreators(getEntityListAll, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnSelectField);


