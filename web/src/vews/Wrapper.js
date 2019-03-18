import React from "react";
import '../App.css'

export default class Wrapper extends React.Component {

    render() {
        return (
            <div style={{position: 'relative'}} className={'app-body'}>
                {this.props.components}
            </div>
        )
    }
}