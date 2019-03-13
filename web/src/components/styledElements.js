import {Link} from "react-router-dom";
import React from "react";
import {ReactComponent as LineSvg} from "../svg/short-line.svg";

export const SimpleLink = ({style, ...props}) => (
    <Link {...props} style={{...style, textDecoration: 'none'}}/>
);

export const Line = ({id}) => (
    <LineSvg id={id}
             style={{position: 'absolute', left: 0, top: 45}}
             viewBox='0 0 200 10'
             width="100%"
             height="20px"/>
);