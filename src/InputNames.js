import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap';

class InputNames extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: this.props.data,
            numberofpeople: this.props.numberofpeople,
        };
        this.data = this.props.data;
    }

    handleChange = (e) => {
        this.data = e.target.value;
        this.setState({data:  e.target.value});
    }

    render() {
        return (
            <div>
                <ModalBody>
                    <textarea name="body"
                        onChange={this.handleChange}
                        style={{height: '400px', width: '200px'}}
                        value={this.state.data}/>
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
        this.props.onSubmit(this.state.data);    
    }
}

export default InputNames