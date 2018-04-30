import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            numberofpeople: this.props.numberofpeople,
            numberofgroups: this.props.numberofgroups
        };
        this.handleInputPeopleChange = this.handleInputPeopleChange.bind(this);
        this.handleInputGroupsChange = this.handleInputGroupsChange.bind(this);
    }

    handleInputPeopleChange(e){
        this.setState({numberofpeople:  e.target.value});
        this.props.onPeopleChange(e.target.value);
    }

    handleInputGroupsChange(e){
        this.setState({numberofgroups:  e.target.value});
        this.props.onGroupsChange(e.target.value);
    }

    render() {
        return (
            <div>
                <ModalBody>
                <div className="form-group">
                    <label className="form-label">Number Of People: {'  '}
                    <input
                    className="form-input"
                    name="numberofpeople"
                    type="text" 
                    value={this.state.numberofpeople}
                    placeholder={'Please input the number of people'}
                    onChange={ e => this.handleInputPeopleChange(e) }/>
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">Number Of Groups: {'  '}
                    <input
                    className="form-input"
                    name="numberofgroups"
                    type="text" 
                    value={this.state.numberofgroups}
                    placeholder={'Please input the number of groups'}
                    onChange={ e => this.handleInputGroupsChange(e) }/>
                    </label>
                </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={this.onSubmit}>OK</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </div>
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

    onSubmit = (values) => {
        this.props.onSubmit(this.state.numberofpeople);
    }
}

export default InputForm