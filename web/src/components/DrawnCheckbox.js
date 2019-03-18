import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import Vivus from "vivus";
import {ReactComponent as IconSvg} from "../svg/checbox-icon.svg"
import {ReactComponent as CheckedIconSvg} from "../svg/checkbox-checked-icon.svg"
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class DrawnCheckbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedId: 'checked-' + Math.random().toString(36).substring(2, 15),
            uncheckedId: 'unchecked-' + Math.random().toString(36).substring(2, 15),
            checked: this.props.defaultValue || false,
            checkedAnimation: null
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.checked !== this.props.checked) {
            this.setState({checked: nextProps.checked});
        }
    }

    componentDidMount() {
        if (this.state.checked === true) {
            new Vivus(this.state.checkedId, {type: 'oneByOne', duration: 20}, () => {})
        } else {
            new Vivus(this.state.uncheckedId, {type: 'oneByOne', duration: 20}, () => {});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.checked === true && prevState.checked !== this.state.checked) {
            new Vivus(this.state.checkedId, {type: 'oneByOne', duration: 20}, () => {})
        }
    }

    //TODO change state from parent component
    changeState(){
        this.setState({checked: this.props.changeState(this.state.checked)});
    }

    handleClick(event) {

        if (!!this.props.onChange) {
            this.props.onChange(event);
        }

        this.setState({checked: event.target.checked});
    }

    render() {
        return (
            <div style={{position: 'relative', height: 48}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checkedIcon={<CheckedIconSvg id={this.state.checkedId}
                                                         width={40}
                                                         height={40}/>}
                            icon={<IconSvg id={this.state.uncheckedId}
                                           width={40}
                                           height={40}/>}
                            checked={this.props.checked || this.state.checked}
                            onChange={event => this.handleClick(event)}
                        />}
                    label={this.props.label || ''}
                />
            </div>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnCheckbox);