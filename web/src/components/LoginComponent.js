import React, {Component} from 'react';
import {connect} from 'react-redux'
import '../App.css';
import {addTodo} from "../actions";
import {RaisedButton} from "material-ui";
import TextField from '@material-ui/core/TextField';
import {login} from "../actions/auth";
import {validate} from "../utils/validation";
import loginSvg from "../svg/login.svg";
import Vivus from "vivus";

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            token: ''
        }
    }

    componentDidMount() {
        new Vivus('my-svg', {duration: 100, file: loginSvg}, () => this.myCallback());
    }

    onclick() {
        console.log('login send');
        this.props.login(this.props.baseUrl, this.state.username, this.state.password);
    }

    myCallback() {
        console.log("vivus")
    }

    render() {
        /*<ReactVivus
            id="foo"
            option={{
                file: loginSvg,
                animTimingFunction: 'LINEAR',
                type: 'oneByOne',
                onReady: console.log
            }}
            style={{display: 'flex'}}
            callback={console.log}
        />*/

        return (
            <div className={'app-body flower'}>
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 20,
                        width: 582,
                        height: 402,
                        position: 'relative'
                    }}>
                        <div id={'my-svg'} style={{width: 582, height: 402, position: 'absolute'}}/>
                        <div style={{width: 300, margin: '0 auto'}}>
                            <div style={{marginTop: 100, marginLeft: 30}}>
                                <TextField
                                    label={'Username'}
                                    fullWidth={true}
                                    value={this.state.username}
                                    classes={{label:'flower'}}
                                    InputProps={{disableUnderline: true}}
                                    error={!!validate('username', this.props.auth.errors)}
                                    helperText={validate('username', this.props.auth.errors)}
                                    onChange={(event) => this.setState({username: event.target.value})}
                                />
                            </div>
                            <div style={{marginTop: 60, marginLeft: 30}}>
                                <TextField
                                    label={'Password'}
                                    fullWidth={true}
                                    value={this.state.password}
                                    type="password"
                                    InputProps={{disableUnderline: true}}
                                    error={!!validate('password', this.props.auth.errors)}
                                    helperText={validate('password', this.props.auth.errors)}
                                    onChange={(event) => this.setState({password: event.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{float: 'right'}}>
                        <RaisedButton label={'Login'}
                                      onClick={() => this.onclick()}/>
                    </div>
                    <div >hello world</div>
                </div>
                {
                    !!this.props.auth.globalError ?
                        <div style={{color: '#f44336'}}>{this.props.auth.globalError}</div> : null
                }

            </div>
        )
            ;
    }
}

const mapStateToProps = state => ({
    baseUrl: state.initBaseUrl.baseUrl,
    auth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text)),
    login: (url, u, p) => dispatch(login(url, u, p))

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
