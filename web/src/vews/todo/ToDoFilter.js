import React from "react";
import {connect} from "react-redux";
import DrawnSelectField from "../../components/DrawnSelectField";
import DrawnDatePicker from "../../components/DrawnDatePicker";
import Typing from "react-typing-animation";
import Vivus from "vivus";
import {ReactComponent as FilterSvg} from "../../svg/filter.svg"
import DrawnButton from "../../components/DrawnButton";
import "./style.css";
import {bindActionCreators} from "redux";
import {getEntityList} from "../../actions/core";

class ToDoFilter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'list-filter-' + Math.random().toString(36).substring(2, 15),
            params: this.props.defaultParams || {}
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {duration: 30}, () => {});
    }

    handleParams(paramName, value) {
        this.setState({params: {...this.state.params, [paramName]: value}});
    }

    search() {
        this.props.getEntityList(this.props.storeName, this.props.entities,
            this.props.paramName || this.props.entities, this.state.params);
    }

    clear() {
        this.setState({params: this.props.defaultParams || {}});
        this.props.getEntityList(this.props.storeName, this.props.entities,
            this.props.paramName || this.props.entities, this.props.defaultParams);
    }

    render() {
        return (
            <div style={{position: 'relative', padding: 10}}>
                <FilterSvg id={this.state.id}
                           style={{position: 'absolute', top: 0, left: 0}}
                           viewBox='5 0 800 300'
                           preserveAspectRatio="none"
                           width="100%"
                           height="100%"
                />
                <div>
                    <div>
                        <Typing speed={10} hideCursor={true}>
                            <h2 style={{margin: '20px', fontWeight: 600}}>{this.props.title}</h2>
                        </Typing>
                    </div>
                    <div className={'filter-body'}>
                        <DrawnSelectField storeName={'taskTypes'}
                                          entities={'enums/taskType'}
                                          paramName={'enumValues'}
                                          keyProp={'name'}
                                          valueProp={'name'}
                                          label={'Task Type'}
                                          value={this.state.params['type'] || []}
                                          onChange={(value) => this.handleParams('type', value)}
                        />
                        <span style={{marginRight: 20}}/>
                        <DrawnSelectField storeName={'taskStatuses'}
                                          entities={'enums/taskStatus'}
                                          paramName={'enumValues'}
                                          keyProp={'name'}
                                          valueProp={'name'}
                                          label={'Task Status'}
                                          multiple={true}
                                          value={this.state.params['status:in'] || []}
                                          onChange={(value) => this.handleParams('status:in', value)}
                        />
                        <span style={{marginRight: 20}}/>
                        <DrawnDatePicker label={'Due Date from'}
                                         value={this.state.params['dueDate:dgoe'] || null}
                                         onChange={(value) => this.handleParams('dueDate:dgoe', value)}
                        />
                        <span style={{marginRight: 20}}/>
                        <DrawnDatePicker label={'Due Date to'}
                                         value={this.state.params['dueDate:dloe'] || null}
                                         onChange={(value) => this.handleParams('dueDate:dloe', value)}
                        />
                    </div>
                    <div className={'search-button'}>
                        <DrawnButton onClick={() => this.search()}>Search</DrawnButton>
                        <span style={{marginRight: 20}}/>
                        <DrawnButton onClick={() => this.clear()}>Clear</DrawnButton>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getEntityList: bindActionCreators(getEntityList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);