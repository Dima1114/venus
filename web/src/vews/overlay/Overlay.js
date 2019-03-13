import React from "react";
import Vivus from "vivus";
import './style.css';
import {ReactComponent as BigGear} from "../../svg/big-gear2.svg"
import {ReactComponent as SecondaryGear} from "../../svg/gear.svg"
import {ReactComponent as InnerGear} from "../../svg/inner-gear.svg"

export default class Overlay extends React.Component {

    componentDidMount() {
        new Vivus('main-gear', {type: 'sync', duration: 10}, () => {});
        new Vivus('inner-gear', {type: 'sync', duration: 10}, () => {});
        new Vivus('secondary-gear', {type: 'sync', duration: 10}, () => {});
    }

    render() {
        return (
            <div className={'overlay'}>
                <div className={'inner-gear'}>
                    <InnerGear id='inner-gear' viewBox="0 0 200 200" width="40"/>
                </div>
                <div className={'main-gear'}>
                    <BigGear id='main-gear' viewBox="0 0 600 600" width="150"/>
                </div>
                <div className={'secondary-gear'}>
                    <SecondaryGear id='secondary-gear' viewBox='0 0 300 300' width="75"/>
                </div>
            </div>
        )
    }
}