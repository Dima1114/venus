import React from "react";
import './login.css';
import '../../App.css';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DrawnButton from "../../components/DrawnButton";
import DrawnTextField from "../../components/DrawnTextField";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {isEmpty} from "../../utils/validation";
import {Space} from "../../components/styledElements";
import Overlay from "../overlay/Overlay";
import {forgotPassword} from "../../actions/forgotPassword";
import Error from "../error/Error";

class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        // new Vivus('main-gear', {type: 'sync', duration: 10}, () => {});
    }

    handleSave() {
        if (!isEmpty(this.state.username)) {
            this.props.forgotPasswordAction(this.state.username);
        }
    }

    //TODO add frame
    render() {
        return (
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={this.props.open}
                onClose={() => this.props.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Forgot your password?"}</DialogTitle>
                <DialogContent>
                    {this.props.forgotPassword.sent === true ?
                        <div>
                            <h3>Check Your email, please</h3>
                        </div>
                        :
                        this.props.forgotPassword.await === true ?
                            <div className={'app-body'}>
                                <Overlay scale={3}/>
                            </div>
                            :
                            <div>
                                <DrawnTextField label={'Username'}
                                                onChange={(value) => this.setState({username: value})}
                                />
                                <div>
                                    <h3>New password will be sent to email that you entered during registration</h3>
                                </div>
                            </div>
                    }
                    {this.props.forgotPassword.globalError && <Error error={this.props.forgotPassword.globalError} />}
                </DialogContent>
                <DialogActions>
                    <DrawnButton onClick={() => this.props.handleClose()}>
                        Close
                    </DrawnButton>
                    <Space/>
                    <DrawnButton onClick={() => this.handleSave()}>
                        Send Me new Password
                    </DrawnButton>
                    <Space/>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    forgotPassword: state.forgotPassword || {}
});

const mapDispatchToProps = dispatch => ({
    forgotPasswordAction: bindActionCreators(forgotPassword, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);