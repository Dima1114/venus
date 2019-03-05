import React, {Component} from 'react';
import '../App.css';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Vivus from "vivus";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from "../themeDefault";

const muiTheme = getMuiTheme(DefaultTheme);

class DrawnButton extends Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 40}, () => {
        });
    }

    render() {
        const {id, ...other} = this.props;
        return (
            <div style={{position: 'relative', height: 48}}>
                {svg(id)}
                <StyledButton {...other} />
            </div>
        )
    }
}

const svg = (id) => (
    <svg id={id}
         style={{position: 'absolute'}}
         width="106%"
         height="100%"
         viewBox='0 0 100 48'
         preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Layer 1</title>
            <path fill="none" strokeWidth="4.5" strokeOpacity="null" fillOpacity="null" id="svg_3"
                  d="m1.642857,2.633929c0,0.142857 0.136084,0.142857 0.272167,0.142857c0.136084,0 0.272168,0 0.408251,0c0.136084,0 0.272167,0.142857 0.544335,0.142857c0.272168,0 0.816502,0 1.224754,0c0.680419,0 1.633005,0 2.721675,0c0.952586,0 1.897922,0.214105 2.857758,0.285714c0.95019,0.070889 2.042923,-0.0632 3.129926,0c1.230406,0.071538 2.041257,0.285714 2.85776,0.285714c1.088669,0 2.313424,0.142857 3.402093,0.142857c0.952586,0 2.313424,0.285714 2.993842,0.285714c1.088669,0 2.179423,0.063856 3.538178,0.142857c1.230403,0.071538 2.177339,0.142857 3.129925,0.142857c0.816503,0 1.360838,0 1.905174,0c0.680416,0 1.490567,-0.07129 2.585589,-0.142857c1.086565,-0.071014 2.174639,-0.028375 3.402095,-0.142857c2.03776,-0.190057 3.405006,-0.032257 5.307264,-0.142857c1.230407,-0.071538 2.585592,-0.285714 3.810345,-0.285714c1.088673,0 2.177343,0 3.266012,0c0.952586,0 2.041256,0 3.538178,0c1.496919,0 2.721672,0 3.538175,0c0.68042,0 1.489673,0.071248 2.449509,0.142857c1.221671,0.091143 2.177339,0 3.129929,0c0.952586,0 1.905172,0 2.721672,0c0.952586,0 1.633006,0 2.313426,0c0.952586,0 2.170987,0.07129 3.266005,0.142857c1.494034,0.097645 2.857759,0 4.354685,0c1.360832,0 2.857759,0 3.810345,0c0.816499,0 1.088666,0 1.633006,0c0.816499,0 1.771484,0.070889 2.721672,0c0.959839,-0.071609 1.905172,-0.142857 2.585592,-0.142857c1.088666,0 2.028701,-0.070889 2.585592,-0.142857c0.675325,-0.087273 1.224753,0 1.769086,0c0.816507,0 1.496919,0.142857 2.313426,0.142857c0.816499,0 1.496919,0 1.905172,0c0.272166,0 0.544333,0 0.68042,0c0.13608,0 0.544333,0 1.496919,0l0.544333,0"
                  stroke="#000"/>
            <path fill="none" stroke="#000" strokeWidth="4.5" strokeOpacity="null" fillOpacity="null" id="svg_4"
                  d="m90.897861,1.875584c0.142853,0 0.285713,0.142859 0.428566,0.428571c0.14286,0.285716 0.14286,0.857142 0.285721,1.428571c0.142853,0.571428 0.214035,1.276852 0.285713,2.142857c0.058914,0.711852 0.142853,1.428572 0.142853,1.714286c0,0.428571 0,0.857143 0,1.428571c0,0.714286 -0.142853,1.428571 -0.142853,2.142857c0,1 0,1.857143 0,3.142858c0,1 0,1.714286 0,2.714286c0,1.142857 0.156494,1.711048 0.285713,2.285713c0.159805,0.710686 0.224953,1.859301 0.285713,2.714287c0.071609,1.007612 0.14286,1.571428 0.14286,2c0,0.285713 0,0.571428 0,0.857143c0,0.42857 0,0.714285 0,1.285713c0,0.714287 -0.070496,1.268366 -0.14286,1.714287c-0.045769,0.282024 -0.083946,0.716719 -0.14286,1.42857c-0.071671,0.866005 -0.217079,1.724976 -0.428566,2.857143c-0.108154,0.579 -0.14286,1.285715 -0.14286,1.857141c0,0.428574 -0.142853,1.14286 -0.142853,2c0,0.714287 0,1.285717 0,1.857143c0,0.142857 -0.056305,0.574211 0,1.142857c0.071777,0.724888 0.142853,1.285717 0.142853,1.714287c0,0.285713 0.069466,0.546249 0.14286,0.857143c0.131294,0.556145 0.142853,0.857143 0.142853,1.285713c0,0.142857 0,0.428574 0,0.714287c0,0.142857 0,0.42857 0,0.714287c0,0.42857 0,0.571426 0,0.857143l0,0.142857l0,0.142857l0,0.142857"/>
            <path fill="none" strokeWidth="4.5" strokeOpacity="null" fillOpacity="null" id="svg_5"
                  d="m95.642856,41.348213c-0.139101,0 -0.69549,0 -1.808275,0c-1.390972,0 -3.33834,0 -5.703004,0c-2.364664,0 -5.146615,0 -7.233085,0c-2.225563,0 -4.312025,0.142857 -5.703004,0.142857c-1.39098,0 -2.506179,-0.079895 -3.755643,0c-1.11927,0.071568 -2.086462,0.14286 -2.921053,0.14286c-0.556389,0 -0.834583,0 -1.251879,0c-0.417288,0 -0.973684,0 -1.669174,0c-0.695482,0 -1.947368,0 -3.199247,0c-1.808267,0 -3.06015,0 -4.72932,0c-1.112781,0 -2.35946,-0.071342 -3.75564,-0.14286c-0.833551,-0.042698 -1.661764,-0.071247 -2.642858,-0.142857c-1.248729,-0.091141 -2.641677,-0.008778 -3.616542,-0.142857c-1.111519,-0.152874 -2.225563,-0.142857 -3.199247,-0.142857c-1.251879,0 -2.077837,0.071182 -2.921053,0.142857c-1.247615,0.106045 -2.225563,0 -3.06015,0c-0.417292,0 -0.838093,-0.016953 -1.530077,0.142857c-0.559542,0.129223 -1.24325,0.356899 -2.086466,0.428574c-0.831742,0.070698 -1.66917,0.142857 -2.642854,0.142857c-1.39098,0 -2.503761,0 -3.755641,0c-0.973684,0 -1.808269,0 -2.36466,0c-0.69549,0 -1.25188,0 -2.086467,0c-0.695488,0 -1.392859,0.062138 -2.364662,0c-1.119274,-0.071568 -2.225563,-0.285713 -3.477443,-0.285713c-0.834585,0 -1.390978,0 -1.808269,0c-0.69549,0 -1.256049,-0.06982 -1.808271,0c-0.569218,0.071968 -1.116951,0.073036 -1.669173,0.142857c-0.569217,0.071968 -0.973684,0.142857 -1.669173,0.142857c-0.417293,0 -0.834586,0 -1.112782,0c-0.278195,0 -0.556391,0 -1.112781,0c-0.695489,0 -1.390978,0.142857 -1.947368,0.142857c-0.417293,0 -0.834587,0 -1.390978,0c-0.417293,0 -0.975715,0.100628 -1.390977,0.142857c-0.70581,0.071777 -1.390977,0.142857 -1.947368,0.142857c-0.139098,0 -0.278196,0 -0.417293,0c-0.139098,0 -0.417293,0 -0.834587,0l-0.278196,0l-0.139098,0l-0.139098,0"
                  stroke="#000"/>
            <path fill="none" stroke="#000" strokeWidth="4.5" strokeOpacity="null" fillOpacity="null" id="svg_7"
                  d="m2.642857,0.776786c0,0.142857 0.070494,0.411222 0.142857,0.857143c0.114416,0.705063 0,1.571429 0,2.428571c0,1 0.060762,1.859299 0,2.714286c-0.071609,1.007611 -0.2147,1.859351 -0.285714,3c-0.071567,1.149525 -0.142857,2.142857 0,3.285714c0.142857,1.142858 0.04432,1.862009 0.142857,2.857142c0.071778,0.724887 0.285714,1.571429 0.428571,2.714286c0.142857,1.142857 0.174873,1.995275 0.285714,2.857143c0.201271,1.56502 0.331546,2.703794 0.571429,3.857143c0.176947,0.850758 0.152832,1.426968 0.285714,2.285713c0.154473,0.998272 0.213351,1.696938 0.285714,2.142857c0.045767,0.282026 -0.104729,1.006422 0,1.857143c0.071968,0.5846 0.142857,1.285715 0.142857,2.000002c0,0.714283 -0.084461,1.432743 0,2.285713c0.071778,0.724888 0.189989,1.287659 0.142857,1.857143c-0.071673,0.866005 -0.044391,1.440033 -0.142857,1.857143c-0.073392,0.31089 -0.213351,0.696934 -0.285714,1.142857c-0.091532,0.564049 -0.070494,1.125507 -0.142857,1.571426c-0.06865,0.423038 -0.09709,1.003689 -0.142857,1.285717c-0.072363,0.445919 -0.142857,1 -0.142857,1.285713c0,0.285713 0,0.42857 0,0.285713l-0.142857,-0.142857"/>
        </g>
    </svg>
);

const StyledButton = withStyles({
    root: {
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 44,
        padding: '0 30px',
    },
    label: {
        width: '100%',
        textTransform: 'capitalize',
        fontFamily: muiTheme.typography.fontFamily,
        fontSize: 20,
        fontWeight: 600,
        textDecoration: 'none'
    },
})(Button);

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawnButton);