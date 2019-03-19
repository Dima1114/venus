import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ReactComponent as BinSvg} from "../svg/bin.svg"
import {ReactComponent as CompletedSvg} from "../svg/completed.svg"
import {ReactComponent as LineSvg} from "../svg/line.svg"
import Vivus from "vivus";

class DrawnTableToolBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            completedId: 'Toolbar-completed' + Math.random().toString(36).substring(2, 15),
            deleteId: 'Toolbar-delete' + Math.random().toString(36).substring(2, 15),
            underlineId: 'Toolbar-underline' + Math.random().toString(36).substring(2, 15),
        }
    }

    componentDidMount() {
        if (this.props.numSelected > 0) {
            this.addVivus();
            new Vivus(this.state.underlineId, {duration: 20}, () => {});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.numSelected > 0 && prevProps.numSelected === 0) {
            this.addVivus();
        }
    }

    addVivus() {
        new Vivus(this.state.completedId, {type: 'oneByOne', duration: 20}, () => {});
        new Vivus(this.state.deleteId, {type: 'oneByOne', duration: 20}, () => {});
    }

    complete(){
        if(!!this.props.complete){
            this.props.complete();
        }
    }

    delete(){
        if(!!this.props.delete){
            this.props.delete();
        }
    }

    //TODO expand icon buttons hover area
    render() {
        return (
            <div  style={{position: 'relative'}}>
                <LineSvg style={{position: 'absolute', right: 0, bottom: -10}}
                         id={this.state.underlineId}
                         viewBox='0 0 500 20'
                         preserveAspectRatio="none"
                         width="100%"
                         height="20px"/>
                <Toolbar>
                    <div style={{flex: '0 0 auto'}}>
                        {this.props.numSelected > 0 ?
                            <h2>{this.props.numSelected} selected </h2> :
                            <h2>{this.props.name}</h2>}
                    </div>
                    <div style={{flex: '1 1 100%'}}/>
                    <div>
                        {this.props.numSelected > 0 ? (
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Tooltip title="Mark as Completed">
                                    <IconButton aria-label="Mark as Completed"
                                                onClick={() => this.complete()}
                                    >
                                        <CompletedSvg id={this.state.completedId}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="Delete"
                                                onClick={() => this.delete()}
                                    >
                                        <BinSvg id={this.state.deleteId}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : null}
                    </div>
                </Toolbar>
            </div>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnTableToolBar);