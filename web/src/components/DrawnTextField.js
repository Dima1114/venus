import React, {Component} from "react";
import Vivus from "vivus";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typing from "react-typing-animation";
import {Line} from "./styledElements";

class DrawnTextField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'text-field-' + Math.random().toString(36).substring(2, 15),
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {duration: 50}, () => {});
    }

    render() {
        const {onChange, inputProps, helperText, ...props} = this.props;
        return (
            <div style={{position: 'relative', paddingBottom: 10}}>
                <TextField {...props}
                           fullWidth={true}
                           onChange={(event) => onChange(event.target.value)}
                           helperText={!!helperText ? <Typing speed={10} hideCursor={true}>{helperText}</Typing> : null}
                           InputProps={{
                               ...inputProps,
                               disableUnderline: true,
                           }}
                />
                <Line id={this.state.id}/>
            </div>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnTextField);


