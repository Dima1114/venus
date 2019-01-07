import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../App.css';
import {addTodo} from "../actions";
import {RaisedButton} from "material-ui";
import TextField from '@material-ui/core/TextField';
import {login} from "../actions/auth";
import Grid from "@material-ui/core/Grid/Grid";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import {validate} from "../utils/validation";

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }

    onclick() {
        console.log('login send');
        this.props.login(this.props.baseUrl, this.state.username, this.state.password);
    }

    render() {
        return (
            <div className={'app-body'}>
                <div>
                    <div style={{display: 'flex', flexDirection: 'column', marginBottom: 20, maxWidth: 300}}>
                        <Grid container spacing={8} alignItems="flex-end" style={{marginBottom: 10}}>
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={'Username'}
                                    fullWidth={true}
                                    value={this.state.username}
                                    error={!!validate('username', this.props.auth.errors)}
                                    helperText={validate('username', this.props.auth.errors)}
                                    onChange={(event) => this.setState({username: event.target.value})}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Lock />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={'Password'}
                                    value={this.state.password}
                                    type="password"
                                    error={!!validate('password', this.props.auth.errors)}
                                    helperText={validate('password', this.props.auth.errors)}
                                    onChange={(event) => this.setState({password: event.target.value})}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{float: 'right'}}>
                        <RaisedButton label={'Login'}
                                      onClick={() => this.onclick()}/>
                    </div>
                </div>
                {!!this.props.auth.globalError ?
                    <div style={{color: '#f44336'}}>{this.props.auth.globalError}</div> : null
                }

            </div>
        );
    }
}

const mapStateToProps = state => ({
    baseUrl: state.initBaseUrl.baseUrl,
    auth: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text)),
    login: (url, u, p) => dispatch(login(url, u, p))

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
