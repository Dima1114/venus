import React, {Component} from "react";
import {connect} from "react-redux";
import {DatePicker} from "material-ui-pickers";
import Vivus from "vivus";
import {Line} from "./styledElements";
import {ReactComponent as ButtonSvg} from "../svg/button.svg"
import {format} from 'date-fns/esm'

class DrawnDatePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'picker-' + Math.random().toString(36).substring(2, 15),
            value: null
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {duration: 50}, () => {});
    }

    handleChange(date) {

        if (!!this.props.onChange) {
            this.props.onChange(format(date, this.props.outFormat || 'yyyy-MM-dd'));
        }

        this.setState({value: date});
    }

    //TODO customize dialog and its buttons and add vivus
    render() {
        return (
            <div style={{position: 'relative', minWidth: 195, paddingBottom: 10}}>
                <DatePicker
                    label={this.props.label}
                    clearable
                    autoOk
                    okLabel={<Label label={'Ok'}/>}
                    clearLabel={<Label label={'Clear'}/>}
                    cancelLabel={<Label label={'Cancel'}/>}
                    format={" dd / MM / yyyy"}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    value={this.state.value}
                    onChange={date => this.handleChange(date)}
                />
                <Line id={this.state.id}/>
            </div>
        )
    }
}

const Label = ({label}) => (
    <span><ButtonSvg style={{position: 'absolute', top: 0, left: 0}}
                     width={"106%"}
                     height={"106%"}
                     viewBox={'0 0 100 48'}/>{label}</span>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnDatePicker);


