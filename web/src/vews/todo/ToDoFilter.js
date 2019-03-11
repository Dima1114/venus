import React from "react";
import {connect} from "react-redux";
import DrawnSelectField from "../../elements/DrawnSelectField";
import DrawnDatePicker from "../../elements/DrawnDatePicker";
import Typing from "react-typing-animation";
import Vivus from "vivus";
import {muiTheme} from "../../themeDefault";

const color = muiTheme.palette.primary.main;

class ToDoFilter extends React.Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 50}, () => {});
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                {svg(this.props.id)}
                <div>
                    <Typing speed={10} hideCursor={true}>
                        <h2 style={{margin: '20px', fontWeight: 600}}>Todo Filter</h2>
                    </Typing>
                </div>
                <div className={'filter-body'}>
                    <DrawnSelectField id={'task-type'}
                                      entities={'enums/taskType'}
                                      paramName={'enumValues'}
                                      keyProp={'name'}
                                      valueProp={'name'}
                                      label={'task types'}
                    />
                    <span style={{marginRight: 20}}/>
                    <DrawnDatePicker id={'date-before'} label={'Date from'}/>
                    <span style={{marginRight: 20}}/>
                    <DrawnDatePicker id={'date-after'} label={'Date to'}/>
                </div>
            </div>
        )
    }
}

const svg = (id) => (
    <svg
        id={id}
        style={{position: 'absolute', top:0, left: 0}}
        viewBox='5 0 800 300'
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg">
        <g>
            <path
                d="m5,4.5c1,1 1.617317,2.07612 2,3c0.541196,1.306563 1,2 1,3c0,1 0,2 0,4c0,1 0,3 0,6c0,1 0,2 0,4c0,1 0,2 0,3c0,2 0,3 0,5c0,2 2,5 2,7c0,2 0,3 0,6c0,1 0,2 0,5c0,2 0,6 0,10c0,4 1,6 1,7c0,2 1,4 1,7c0,3 0,5 0,7c0,4 0,6 0,9c0,2 0,5 0,7c0,4 0,8 0,10c0,4 0,7 0,10c0,4 0,7 0,8c0,2 0,5 0,6c0,3 0,5 0,9c0,2 0,6 0,10c0,4 0,9 0,11c0,3 0,9 0,10c0,1 0,3 0,4c0,1 0,2 0,4c0,1 0,2 0,3c0,1 0,5 0,9c0,3 0,6 0,9c0,1 0,2 0,4c0,1 0,2 0,3c0,3 -1.486257,7.823746 -2,10c-0.919012,3.89299 -1,7 -1,8c0,2 0.229753,4.026749 0,5c-0.513743,2.176254 -1,5 -1,7c0,2 -1,3 -1,4c0,1 0,3 0,6c0,3 0,5 0,7c0,3 0,5 0,6c0,1 0,4 0,5c0,4 0,5 0,6c0,1 0,3 0,4c0,1 0,2 0,5c0,1 0,2 0,4c0,1 0,2 0,3l0,2l0,1l1,2"
                id="svg_1" strokeWidth="6" stroke={color} fill="none"/>
            <path
                d="m-15,19.5c1,0 2,0 5,0c6,0 13.953321,-2.499031 22,-3c11.97681,-0.745647 15,0 23,0c4,0 7.022476,0.36655 10,0c4.092216,-0.503773 5.925797,-1.497555 11,-2c5.970802,-0.591225 15,-2 23,-2c10,0 17,0 25,0c7,0 15,0 23,0c7,0 12,0 18,0c6,0 12,0 20,0c8,0 21,0 29,0c7,0 16.005188,-0.750648 22,-1c12.031189,-0.500431 20.03746,-0.389084 25,-1c4.092224,-0.503773 10,-1 16,-1c10,0 31,0 40,0c5,0 10.057983,0.832207 16,0c7.209747,-1.009762 16,-2 26,-2c12,0 20,0 33,0c18,0 37,0 41,0c5,0 9,0 15,0c8,0 15,0 23,0c7,0 13,0 20,0c10,0 15,0 22,0c8,0 18,0 30,0c12,0 28,0 41,0c17,0 29,0 39,0c16,0 30,0 44,0c14,0 26,-1 41,-1c14,0 27,0 42,0c14,0 27,0 42,0c14,0 26,0 29,0c1,0 0,0 -1,0c-1,0 -3,0 -4,0l-1,0"
                id="svg_3" fillOpacity="null" strokeOpacity="null" strokeWidth="6" stroke={color} fill="none"/>
            <path
                d="m4,288.5c1,0 3,-1 4,-1c2,0 3,0 4,0c1,0 5,-2 8,-2c2,0 7,0 10,0c2,0 4,0 5,0c2,0 5,-1 6,-1c2,0 9,0 15,0c4,0 7,0 10,0c1,0 2,0 4,0c3,0 8,0 13,0c5,0 12,0 19,0c5,0 11,0 19,0c4,0 9,0 12,0c6,0 12,0 15,0c7,0 12,0 17,0c6,0 13,0 22,0c13,0 21,0 28,0c6,0 11,0 17,0c6,0 13,1 19,1c7,0 14.962616,1.49939 25,2c5.992554,0.298889 11,1 16,1c5,0 11,0 19,0c7,0 16.18045,-1.891083 26,0c5.287994,1.018372 11,2 15,2c4,0 8,0 14,0c5,0 12,0 21,0c6,0 15,0 21,0c9,0 15,0 24,0c8,0 15,0 20,0c6,0 11,0 18,0c6,0 8,0 16,0c6,0 11.968811,0.499573 24,1c6.993958,0.290924 15,0 21,0c6,0 11.946716,1.498749 19,2c5.984924,0.425323 12.790283,0.990234 20,2c4.95166,0.693512 11.962585,0.49939 22,1c8.988831,0.448334 15.953308,0.499023 24,1c4.990356,0.310699 10,0 12,0c2,0 3,0 5,0c5,0 9.922668,-0.435425 20,-2c8.948181,-1.389252 16.052429,-1.144714 23,-2c4.092224,-0.503784 6.769897,-1.548615 11,-3c4.822998,-1.654816 11,-2 16,-2c7,0 13.635681,-2.480377 23,-4c3.948364,-0.640717 6.907776,-0.496216 11,-1c2.977539,-0.366547 6,0 11,0c8,0 13,0 17,0c3,0 6,0 7,0c1,0 3,0 5,0c4,0 8,0 13,0c4,0 5,0 6,0c1,0 1.69342,-0.458801 3,-1c0.923889,-0.38269 4,0 8,0l3,0l1,0"
                id="svg_4" fillOpacity="null" strokeOpacity="null" strokeWidth="6" stroke={color} fill="none"/>
            <path
                d="m784,3.5c-1,1 -1.297363,3.022234 -1,5c2.022461,13.450262 6.46875,19.539759 8,27c1.206421,5.877468 1.990234,10.790257 3,18c0.970886,6.932339 2.498291,9.937962 3,16c0.329895,3.986374 0.903381,12.016899 2,18c1.838501,10.030945 2,15 2,20c0,5 0,10 0,16c0,8 0,12 0,15c0,5 0,12 0,17c0,5 0,11 0,17c0,6 0.295593,13.014603 0,16c-0.502441,5.074203 -1,10 -1,15c0,4 0,9 0,13c0,9 0.488708,12.029968 0,16c-0.503784,4.092209 -1.199097,9.06456 -2,14c-0.506531,3.121445 -2,6 -2,9c0,2 0,6 0,11c0,5 0,6 0,7c0,2 -1,4 -1,5c0,2 -0.458801,2.693451 -1,4c-0.38269,0.923889 0,3 0,4c0,1 -0.458801,1.693451 -1,3c-0.38269,0.923889 0,2 0,3l0,1l0,2"
                id="svg_7" fillOpacity="null" strokeOpacity="null" strokeWidth="6" stroke={color} fill="none"/>
        </g>
    </svg>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);