import React, {Component} from "react";
import Vivus from "vivus";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typing from "react-typing-animation";
import {Line} from "./styledElements";

class DrawnTextField extends Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 100}, () => {
        });
    }

    render() {
        const {id, inputProps, helperText, ...props} = this.props;
        return (
            <div style={{position: 'relative'}}>
                <TextField {...props}
                           helperText={!!helperText ? <Typing speed={10} hideCursor={true}>{helperText}</Typing> : null}
                           InputProps={{
                               ...inputProps,
                               disableUnderline: true,
                           }}
                />
                <Line id={id}/>
            </div>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnTextField);


