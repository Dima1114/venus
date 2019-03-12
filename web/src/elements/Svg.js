import React, {Component} from 'react';
import '../App.css';

class Svg extends Component {

    render() {
        const {id, children, ...other} = this.props;
        return (
            <svg id={id} {...other}>
                {children}
            </svg>
        )
    }

}

export default Svg;