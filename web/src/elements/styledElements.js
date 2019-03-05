import {Link} from "react-router-dom";
import React from "react";

export const SimpleLink = ({style, ...props}) => (
    <Link {...props} style={{...style, textDecoration: 'none'}}/>
);