import React from 'react'
import {Provider} from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import {muiTheme} from "../themeDefault";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';

const Root = ({store}) => (
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Router>
                    <App/>
                </Router>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </Provider>
);

export default Root