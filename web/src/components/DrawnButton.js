import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Vivus from "vivus";
import {ReactComponent as ButtonSvg} from "../svg/button.svg"

class DrawnButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'button-' + +Math.random().toString(36).substring(2, 15),
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {duration: 40}, () => {});
    }

    render() {
        const {...other} = this.props;
        return (
            <div style={{position: 'relative', height: 48}}>
                <ButtonSvg id={this.state.id}
                           style={{position: 'absolute'}}
                           width={"106%"}
                           height={"100%"}
                           viewBox={'0 0 100 48'}
                />
                <Button {...other} />
            </div>
        )
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnButton);