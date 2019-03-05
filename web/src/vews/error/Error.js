import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import Vivus from "vivus";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultTheme from "../../themeDefault";

const muiTheme = getMuiTheme(DefaultTheme);
const color =muiTheme.palette.error.main;

class Error extends React.Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 40}, () => {
        });
    }

    render() {
        const {style, id, error} = this.props;
        return (
            <div className={'error-body'} style={{...style, position: 'relative', width: '100%', padding: '10px 10px'}}>
                <p style={{padding: '0 20px', fontWeight: 600, color: color}}>{error}</p>
                {svg(id)}
            </div>
        )
    }
}

const svg = (id) => (
    <svg id={id}
         style={{position: 'absolute', bottom: 0}}
         width="100%"
         height="100%"
         viewBox='-10 -10 590 210'
         preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Layer 1</title>
            <path
                d="m3.5,9.4375c1,0 2.07612,0.382684 3,0c1.306563,-0.541196 4,-1 5,-1c2,0 4.925797,-0.497555 10,-1c1.990267,-0.197075 3,0 6,0c2,0 5.025826,-0.320364 7,0c3.121445,0.506541 7,2 9,2c6,0 9,1 12,1c4,0 7,0 12,0c6,0 9,1 14,1c2,0 6,0 9,0c1,0 3,0 5,0c5,0 9,0 17,0c5,0 7.823746,0.486257 10,1c4.866241,1.148765 10.015091,0.425334 16,0c7.053284,-0.501261 12,-2 17,-2c8,0 20,0 33,0c13,0 22,0 28,0c1,0 7,0 12,0c6,0 12,0 15,0c7,0 12.965973,0.499486 24,1c8.990753,0.40783 15,0 23,0c5,0 11.023865,-0.577364 18,0c6.062042,0.50171 11,1 16,1c4,0 10,0 16,0c5,0 9,0 14,0c2,0 7.937958,0.49829 14,1c3.986359,0.329922 8.077484,-0.961094 14,0c3.121429,0.50654 7.925781,1.497555 13,2c5.970795,0.591227 9,0 13,0c5,0 12,0 18,0c7,0 15,1 21,1c6,0 13,0 17,0c6,0 10,0 14,0c6,0 10,0 16,0c2,0 4,0 14,0c5,0 7.925781,-1.497555 13,-2c1.990295,-0.197075 8.007507,0.122183 9,0c4.092224,-0.503775 8.907776,-2.496225 13,-3c0.992493,-0.122183 2.076111,0.382684 3,0c1.30658,-0.541196 2,-1 3,-1c1,0 3,0 5,0c1,0 2,0 6,0c1,0 2,0 4,0l1,0l1,0l3,0"
                id="svg_3" strokeWidth="8.5" stroke={color} fill="none"/>
            <path
                d="m563.5,10.4375c0,0 1.955139,0.549155 3,4c0.57959,1.914185 0,4 0,5c0,1 0,3 0,4c0,3 0,5 0,7c0,1 0,2 0,3c0,3 -1.486267,4.82375 -2,7c-0.459534,1.946499 0,3 0,5c0,2 -0.68927,3.080254 0,6c0.513733,2.17625 1,4 1,8c0,3 0,5 0,6c0,2 0,5 0,8c0,4 1,4 1,6c0,1 0,2 0,3c0,3 0.486267,3.823746 1,6c0.459534,1.946495 0,6 0,9c0,4 0,7 0,12c0,2 0,5 0,8c0,2 0,3 0,5c0,3 0,4 0,7c0,3 0.459534,4.053497 0,6c-0.513733,2.176254 -0.770264,6.026749 -1,7c-0.513733,2.176254 -0.61731,5.076126 -1,6c-0.541199,1.306564 -1,2 -1,3c0,1 0,2 0,5c0,2 0,3 0,4c0,3 0,4 0,6c0,1 0,3 0,4c0,1 0,2 0,3c0,1 0,2 0,3c0,1 0,2 0,4c0,2 0,4 0,5c0,1 0,2 0,3l0,1l0,1"
                id="svg_5" strokeWidth="8.5" stroke={color} fill="none"/>
            <path
                d="m563.5,190.4375c0,0 0,0 -5,0c-3,0 -7,-1 -9,-1c-3,0 -8,0 -11,0c-1,0 -4,0 -5,0c-3,0 -5,0 -7,0c-5,0 -8.022461,-0.366547 -11,0c-4.092224,0.503769 -7.907776,2.496231 -12,3c-1.985016,0.24437 -4,0 -8,0c-3,0 -6.012909,-0.160187 -7,0c-3.121429,0.506546 -4,1 -7,1c-1,0 -2,0 -5,0c-6,0 -9.022491,0.366547 -12,0c-4.092224,-0.503769 -5.022491,-0.633453 -8,-1c-4.092224,-0.503769 -7,-1 -11,-1c-3,0 -6,0 -9,0c-1,0 -6,-1 -12,-1c-4,0 -11.712006,-0.981628 -17,-2c-5.891724,-1.134644 -10,0 -17,0c-5,0 -11.925781,-0.497559 -17,-1c-5.970795,-0.591232 -9,0 -15,0c-6,0 -7.953308,-0.499039 -16,-1c-3.992279,-0.24855 -9,0 -10,0c-4,0 -6,1 -13,1c-4,0 -10.009735,0.802917 -12,1c-5.074219,0.502441 -13.01947,1.60585 -17,2c-5.074219,0.502441 -11.017609,0.503784 -18,1c-7.053284,0.501266 -14,1 -16,1c-10,0 -16.011597,0.372818 -22,0c-8.046677,-0.500961 -14.029205,-0.408768 -20,-1c-5.074203,-0.502441 -12,-1 -17,-1c-4,0 -11,0 -18,0c-4,0 -9.020447,-0.494888 -15,0c-6.062042,0.501709 -17,1 -22,1c-8,0 -11.953323,1.499039 -20,2c-6.986473,0.434967 -13.015091,-0.574661 -19,-1c-7.053276,-0.501266 -15,-1 -19,-1c-4,0 -7.051651,0.640732 -11,0c-3.121445,-0.506546 -7.006813,-0.835037 -9,-1c-6.062038,-0.501709 -7,-1 -10,-1c-2,0 -4,-1 -7,-1c-1,0 -3.076122,0.38269 -4,0c-1.306564,-0.541199 -8,-1 -9,-1c-2,0 -3,0 -7,0c-2,0 -3,0 -4,0c-1,0 -5,0 -10,0c-1,0 -2,0 -3,0l-1,0"
                id="svg_6" strokeWidth="8.5" stroke={color} fill="none"/>
            <path
                d="m10.5,183.4375c0,0 0,0 0,-1c0,-5 0,-10 0,-15c0,-5 -1.49829,-7.937958 -2,-14c-0.412403,-4.982956 -0.49346,-8.878555 -1,-12c-0.320364,-1.974182 -1,-5 -1,-7c0,-2 0,-5 0,-10c0,-4 0.488733,-6.029968 0,-10c-0.503775,-4.092216 -1,-6 -1,-9c0,-2 -0.486257,-3.823746 -1,-6c-0.689259,-2.919746 0,-5 0,-9c0,-2 0,-5 0,-7c0,-2 0,-5 0,-6c0,-2 1,-4 1,-7c0,-3 0.486257,-5.823746 1,-8c0.689259,-2.919746 -0.320364,-6.025826 0,-8c0.506541,-3.121445 0.080988,-6.107002 1,-10c0.513743,-2.17625 0.540494,-5.053501 1,-7c0.513743,-2.17625 1,-4 1,-6c0,-1 0,-3 0,-6c0,-2 1,-3 1,-4c0,-1 0,-3 0,-6c0,-1 0,-2 0,-3l0,-1l-1,-1"
                id="svg_7" strokeWidth="8.5" stroke={color} fill="none"/>
        </g>
    </svg>
);

const mapStateToProps = state => ({
    auth: state.authReducer,
    baseUrl: state.initBaseUrl.baseUrl
});

const mapDispatchToProps = dispatch => ({
    onTodoClick: text => dispatch(addTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
