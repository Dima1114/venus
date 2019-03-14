import React, {Component} from "react";
import {connect} from "react-redux";
import {DatePicker} from "material-ui-pickers";
import Vivus from "vivus";
import {Line} from "./styledElements";
import {ReactComponent as ButtonSvg} from "../svg/button.svg"

class DrawnDatePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: null,
        }
    }

    componentDidMount() {
        new Vivus(this.props.id, {duration: 50}, () => {
        });
    }

    handleChange(date) {

        if (!!this.props.onChange) {
            this.props.onChange(date);
        }

        this.setState({value: date});
    }

    //TODO customize dialog and its buttons
    render() {
        return (
            <div style={{position: 'relative'}}>
                <DatePicker
                    label={this.props.label}
                    clearable
                    autoOk
                    okLabel={<span>
                        <ButtonSvg id={this.props.id + '-date-ok-pick'}
                                   style={{position: 'absolute'}}
                                   width={"106%"}
                                   height={"100%"}
                                   viewBox={'0 0 100 48'}/>
                                              Ok</span>}
                    format={" dd / MM / yyyy"}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    value={this.state.value}
                    onChange={date => this.handleChange(date)}
                />
                <Line id={this.props.id}/>
            </div>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnDatePicker);


