import React from "react";
import Vivus from "vivus";
import './style.css';
import {ReactComponent as BigGear} from "../../svg/big-gear2.svg"
import {ReactComponent as SecondaryGear} from "../../svg/gear.svg"
import {ReactComponent as InnerGear} from "../../svg/inner-gear-2.svg"

//TODO fix scale options (5 is the biggest 1 is the smallest)
export default class Overlay extends React.Component {

    componentDidMount() {
        new Vivus('main-gear', {type: 'sync', duration: 10}, () => {
        });
        new Vivus('inner-gear', {type: 'sync', duration: 10}, () => {
        });
        new Vivus('secondary-gear', {type: 'sync', duration: 10}, () => {
        });
    }

    render() {
        const scale = 5 / this.props.scale || 1;
        return (
            <div className={'overlay'} style={{padding: 40 / scale, maxWidth: 220 / scale}}>
                <div className={'inner-gear'}
                     style={{
                         maxWidth: 40 / scale,
                         maxHeight: 40 / scale,
                         top: 141 / scale,
                         left: 117 / scale
                     }}>
                    <InnerGear id='inner-gear' viewBox="0 0 200 200" width={40 / scale} style={{float: 'left'}}/>
                </div>
                <div className={'main-gear'}
                     style={{
                         marginRight: -12 / scale,
                         marginTop: 30 / scale,
                         maxWidth: 150 / scale,
                         maxHeight: 150 / scale
                     }}>
                    <BigGear id='main-gear' viewBox="0 0 600 600" width={150 / scale}/>
                </div>
                <div className={'secondary-gear'}
                     style={{
                         marginBottom: 30 / scale,
                         maxWidth: 75 / scale,
                         maxHeight: 75 / scale
                     }}>
                    <SecondaryGear id='secondary-gear' viewBox='0 0 300 300' width={75 / scale}/>
                </div>
            </div>
        )
    }
}