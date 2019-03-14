import React from "react";
import {connect} from "react-redux";
import DrawnSelectField from "../../components/DrawnSelectField";
import DrawnDatePicker from "../../components/DrawnDatePicker";
import Typing from "react-typing-animation";
import Vivus from "vivus";
import {ReactComponent as FilterSvg} from "../../svg/filter.svg"
import DrawnCheckbox from "../../components/DrawnCheckbox";
import DrawnButton from "../../components/DrawnButton";
import "./style.css";

class ToDoFilter extends React.Component {

    componentDidMount() {
        new Vivus(this.props.id, {duration: 50}, () => {});
    }

    search(){}

    clear(){}

    render() {
        return (
            <div style={{position: 'relative'}}>
                <FilterSvg id={this.props.id}
                           style={{position: 'absolute', top:0, left: 0}}
                           viewBox='5 0 800 300'
                           preserveAspectRatio="none"
                           width="100%"
                           height="100%"
                />
                <div>
                    <Typing speed={10} hideCursor={true}>
                        <h2 style={{margin: '20px', fontWeight: 600}}>Todo Filter</h2>
                    </Typing>
                </div>
                <div className={'filter-body'}>
                    <DrawnSelectField id={'task-type'}
                                      storeName={'taskTypes'}
                                      entities={'enums/taskType'}
                                      paramName={'enumValues'}
                                      keyProp={'name'}
                                      valueProp={'name'}
                                      label={'Task Type'}
                    />
                    <span style={{marginRight: 20}}/>
                    <DrawnSelectField id={'task-status'}
                                      storeName={'taskStatuses'}
                                      entities={'enums/taskStatus'}
                                      paramName={'enumValues'}
                                      keyProp={'name'}
                                      valueProp={'name'}
                                      label={'Task Status'}
                    />
                    <span style={{marginRight: 20}}/>
                    <DrawnDatePicker id={'date-before'} label={'Date from'}/>
                    <span style={{marginRight: 20}}/>
                    <DrawnDatePicker id={'date-after'} label={'Date to'}/>
                    <span style={{marginRight: 20}}/>
                    <DrawnCheckbox id={'filter-checkbox-done'} label={'show completed'}/>
                </div>
                <div className={'search-button'}>
                    <DrawnButton id={'Search-filter'}
                                 onClick={() => this.search()}>Search</DrawnButton>
                    <span style={{marginRight: 20}}/>
                    <DrawnButton id={'Clear-filter'}
                                 onClick={() => this.clear()}>Clear</DrawnButton>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);