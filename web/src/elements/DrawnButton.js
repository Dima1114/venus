import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Vivus from "vivus";
import ButtonSvg from "../svg/ButtonSvg";

class DrawnButton extends Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 40}, () => {
        });
    }

    render() {
        const {id, ...other} = this.props;
        return (
            <div style={{position: 'relative', height: 48}}>
                <ButtonSvg id={id}
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