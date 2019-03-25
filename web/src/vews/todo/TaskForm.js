import React from "react";
import './style.css';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DrawnButton from "../../components/DrawnButton";
import DrawnDatePicker from "../../components/DrawnDatePicker";
import DrawnSelectField from "../../components/DrawnSelectField";
import DrawnTextField from "../../components/DrawnTextField";
import {bindActionCreators} from "redux";
import {createEntity} from "../../actions/core";
import {connect} from "react-redux";
import {isEmpty} from "../../utils/validation";
import {Space} from "../../components/styledElements";

class TaskForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {}
        }
    }

    componentDidMount() {
        // new Vivus('main-gear', {type: 'sync', duration: 10}, () => {});
    }

    handleSave() {
        if(!isEmpty(this.state.task)){
            this.props.createEntity(this.props.storeName, this.props.entities, this.state.task);
            this.props.handleClose();
        }
    }

    handleParams(name, value){
        this.setState({task: {...this.state.task, [name]: value}})
    }

    //TODO add frame
    render() {
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'md'}
                open={this.props.open}
                onClose={() => this.props.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Create new task"}</DialogTitle>
                <DialogContent>
                    <DrawnTextField label={'Title'}
                                    onChange={(value) => this.handleParams('title', value)}
                    />
                    <DrawnTextField label={'Comment'}
                                    onChange={(value) => this.handleParams('comment', value)}
                    />
                    <div className={'flex-body'}>
                        <DrawnSelectField storeName={'taskTypes'}
                                          entities={'enums/taskType'}
                                          paramName={'enumValues'}
                                          keyProp={'name'}
                                          valueProp={'name'}
                                          label={'Task Type'}
                                          onChange={(value) => this.handleParams('type', value)}
                        />
                        <Space/>
                        <DrawnDatePicker label={'Due Date'}
                                         value={this.state.task.dueDate || null}
                                         onChange={(value) => this.handleParams('dueDate', value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <DrawnButton onClick={() => this.props.handleClose()}>
                        Close
                    </DrawnButton>
                    <Space/>
                    <DrawnButton onClick={() => this.handleSave()}>
                        Save
                    </DrawnButton>
                    <Space/>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    createEntity: bindActionCreators(createEntity, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);