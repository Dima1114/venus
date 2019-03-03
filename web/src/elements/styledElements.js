import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from "../themeDefault";
import React from "react";
import button from "../svg/button.svg";

const muiTheme = getMuiTheme(DefaultTheme);

export const StyledButton = withStyles({
    root: {
        // backgroundImage: 'url(' + button + ')',
        // backgroundSize: 'cover',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 48,
        padding: '0 30px',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: muiTheme.typography.fontFamily,
        fontSize: 20,
        textDecoration: 'none'
    },
})(Button);

export const BackButton = ({id,...props}) => (
    <div style={{position:'relative'}}>
        <object type="image/svg+xml" data={button} aria-label={'button'} id={'but-svg'} style={{position:'absolute'}}/>
        <StyledButton {...props} />
    </div>
);

export const SimpleLink = ({style, ...props}) => (
    <Link {...props} style={{...style, textDecoration: 'none'}}/>
);