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

    constructor(props) {
        super(props);

        this.state = {
            id: 'list-filter-' + Math.random().toString(36).substring(2, 15),
        }
    }

    componentDidMount() {
        new Vivus(this.state.id, {duration: 30}, () => {});
    }

    search() {
    }

    clear() {
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
                            <h2 style={{margin: '20px', fontWeight: 600}}>Todo Filter</h2>
                        </Typing>
                    </div>
                    <div className={'filter-body'}>
                        <DrawnSelectField storeName={'taskTypes'}
                                          entities={'enums/taskType'}
                                          paramName={'enumValues'}
                                          keyProp={'name'}
                                          valueProp={'name'}
                                          label={'Task Type'}
                        />
                        <span style={{marginRight: 20}}/>
                        <DrawnSelectField storeName={'taskStatuses'}
                                          entities={'enums/taskStatus'}
                                          paramName={'enumValues'}
                                          keyProp={'name'}
                                          valueProp={'name'}
                                          label={'Task Status'}
                        />
                        <span style={{marginRight: 20}}/>
                        <DrawnDatePicker label={'Date from'}/>
                        <span style={{marginRight: 20}}/>
                        <DrawnDatePicker label={'Date to'}/>
                        <span style={{marginRight: 20}}/>
                        <DrawnCheckbox label={'show completed'}/>
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

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFilter);