import React from 'react';
import {connect} from 'react-redux'
import {addTodo} from "../../actions";
import Vivus from "vivus";


class Error extends React.Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 40}, () => {});
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                {svg(this.props.id)}
                <p>{this.props.error}</p>
            </div>
        )
    }
}

const color = "#f00";

const svg = (id) => (
    <svg id={id}
         style={{position: 'absolute'}}
         width="90%"
         height="90%"
         viewBox='100 0 0 100'
         preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg">
        <g>
            <title>Layer 1</title>
            <rect stroke={color} id="svg_2" height="95.249883" width="574.964899" y="1.930619" x="2.090565" strokeOpacity="null" strokeWidth="5" fill="none"/>
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
