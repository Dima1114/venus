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
            checked: false,
            checkedAnimation: null
        }
    }

    componentDidMount() {
        new Vivus('unchecked-' + this.props.id, {type:'oneByOne', duration: 20}, () => {});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.checked === true) {
            new Vivus('checked-' + this.props.id, {type:'oneByOne', duration: 20}, () => {})
        }
    }

    handleClick() {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            //TODO centre frame
            <div style={{position: 'relative', height: 48}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checkedIcon={<CheckedIconSvg id={'checked-' + this.props.id}/>}
                            icon={<IconSvg id={'unchecked-' + this.props.id}/>}
                            checked={this.state.checked}
                            onChange={() => this.handleClick()}
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