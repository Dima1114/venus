import React from 'react'
import {Provider} from 'react-redux'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import HomeWrapper from "./HomeWrapper";

const Root = ({store}) => (
    <Provider store={store}>
        <MuiThemeProvider>
            <HomeWrapper/>
        </MuiThemeProvider>
    </Provider>
);

export default Root