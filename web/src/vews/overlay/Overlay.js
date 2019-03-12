import React from "react";
import {connect} from "react-redux";
import Vivus from "vivus";
import bigGear from "../../svg/big-gear2.svg"
import secondaryGear from "../../svg/gear.svg"
import innerGear from "../../svg/inner-gear.svg"
import ReactSVG from 'react-svg'

class Overlay extends React.Component {

    render() {
        return (
            <div className={'overlay'}>
                <div className={'inner-gear'}>
                    <ReactSVG src={innerGear}
                              onInjected={() => new Vivus('inner-gear', {duration: 50}, () => {})}
                    />
                </div>
                <div className={'main-gear'}>
                    <ReactSVG src={bigGear}
                              onInjected={() => new Vivus('main-gear', {duration: 50}, () => {})}
                    />
                </div>
                <div className={'secondary-gear'}>
                    <ReactSVG src={secondaryGear}
                              onInjected={() => new Vivus('secondary-gear', {duration: 50}, () => {})}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);