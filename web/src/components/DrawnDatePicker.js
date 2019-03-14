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
        new Vivus(this.props.id, {duration: 50}, () => {});
    }

    handleChange(date) {

        if (!!this.props.onChange) {
            this.props.onChange(date);
        }

        this.setState({value: date});
    }

    //TODO customize dialog and its buttons and add vivus
    render() {
        return (
            <div style={{position: 'relative'}}>
                <DatePicker
                    label={this.props.label}
                    clearable
                    autoOk
                    okLabel={<Label id={this.props.id + 'Ok-button'} label={'Ok'}/>}
                    clearLabel={<Label id={this.props.id + 'Clear-button'} label={'Clear'}/>}
                    cancelLabel={<Label id={this.props.id + 'Cancel-button'} label={'Cancel'}/>}
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

const Label = ({id, label}) => (
    <span><ButtonSvg id={id}
                     style={{position: 'absolute', top: 0, left: 0}}
                     width={"106%"}
                     height={"106%"}
                     viewBox={'0 0 100 48'}/>{label}</span>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnDatePicker);


