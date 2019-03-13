import React from "react";
import Vivus from "vivus";
import Paper from "@material-ui/core/Paper";
import {ReactComponent as SelectSvg} from "../svg/select.svg"

export default class DrawnPaper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {type: 'sync', duration: 50}, () => {
        });
    }

    render() {
        const {id, children, ...props} = this.props;
        return (
            <Paper {...props}>
                <SelectSvg id={this.state.id}
                           width={'100%'}
                           height={'100%'}
                           style={{position: 'absolute'}}
                           viewBox={'0 0 210 210'}/>
                {children}
            </Paper>
        )
    }
}