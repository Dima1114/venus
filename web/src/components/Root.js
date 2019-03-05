import React from 'react'
import {Provider} from 'react-redux'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import HomeWrapper from "./HomeWrapper";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from '../themeDefault.js';
import {BrowserRouter as Router} from "react-router-dom";

const muiTheme = getMuiTheme(DefaultTheme);

const Root = ({store}) => (
    <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
            <Router>
                <HomeWrapper/>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default Root