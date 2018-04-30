import React, { Component } from 'react';
import './App.css';
import { Button, Modal, ModalHeader } from 'reactstrap';
import InputForm from './InputForm'
import InputNames from './InputNames'
import Item from './Item'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modal: false,
      modalTitle: '',
      numberofpeople: '70',
      numberofgroups: '10',
      row: '1',
      col: '1',
      data: [],
      datacheck: [],
      tableList: [],
      nameList: [],
      EnableCal: false,
      modalNames: false,
    };
    this.addpeople = this.addpeople.bind(this);
    this.addnames = this.addnames.bind(this);
    this.about = this.about.bind(this);

    this.numberofpeople = this.state.numberofpeople;
    this.numberofgroups = this.state.numberofgroups;
    this.namesList = [];
    for (let t = 1; t <= this.state.numberofpeople; t++) {
      this.namesList.push(t.toString()+'\n');
    }

  }

  addpeople(){
    this.toggle();
  }

  addnames(){
    this.toggleNames();
  }

  about(){
    alert("By Aood(Narong W.)")
  }

  toggle = () => {
    this.setState({
        modal: !this.state.modal
    })
  }

  toggleNames = () => {
    this.setState({
      modalNames: !this.state.modalNames
    })
  }

  handleSubmit = (values) => {
    this.toggle()

    if (this.state.numberofpeople !== this.numberofpeople){
      if ((this.numberofpeople/this.numberofgroups) % 1 !== 0){
        this.namesList = [];
        for (let t = 1; t <= this.numberofpeople; t++) {
          this.namesList.push(t.toString()+'\n');
        }
        this.setState({numberofpeople: (Math.floor(this.numberofpeople/this.numberofgroups)+1)*this.numberofgroups})
      } else {
        this.setState({numberofpeople: this.numberofpeople})
      }
      this.setState({EnableCal: false, data: [], datacheck: []})
    }

    if (this.state.numberofgroups !== this.numberofgroups){
      this.setState({numberofgroups: this.numberofgroups})
      this.setState({EnableCal: false, data: [], datacheck: []})
    }
  }

  onInputPeopleChange = (value) => {
    if (value > 0 && value <= 500) {
      this.numberofpeople = value;
    } else {
      alert('Please input the value between 0 and 501')
    }
  }

  onInputGroupsChange = (value) => {
    if (value > 0 && value <= 25) {
      this.numberofgroups = value;
    } else {
      alert('Please input the value between 0 and 26')
    }
  }

  handleSubmitNames = (values) => {
    this.toggleNames()
    this.setState({names: values})

    this.namesList = values;
  }

  afterCal = (row,col,data) => {
    var rowcol = row.toString()+'-'+col.toString()

    var found = this.state.datacheck.find(function(element) {
      return element === rowcol;
    });

    if (found === undefined) {
      this.setState({data: [...this.state.data, data] , datacheck:  [...this.state.datacheck, rowcol]});
    } 
  } 

  printresults = () => {
    this.setState({EnableCal: true})
  }
 
  render() {
    const itemsList = [];
    let col = 1;
    let row = 1;
    let keyIndex = 0;   
    

    if ((this.state.numberofpeople > 0) && (this.state.numberofgroups > 0)) {
      for (let z = 0; z < this.state.numberofgroups; z++) {
        col = 1;
        row = 1;

        itemsList.push(<br key={keyIndex++}/>);
        for (let j = 0; j <= (this.state.numberofgroups-1); j++) {
          itemsList.push(<Item result={this.afterCal} index={z} numberofgroups={this.state.numberofgroups} row={0} col={j+1} key={keyIndex++} header='Table'ItemID={j+1}/>);
        }
        itemsList.push(<br key={keyIndex++}/>);

        for (let i = 0; i <= (this.state.numberofpeople-1); i++) {
          itemsList.push(<Item numberofpeople={this.state.numberofpeople} names={this.namesList} name='' enableCal={this.state.EnableCal} index={z} result={this.afterCal} numberofgroups={this.state.numberofgroups} row={row} col={col++} key={keyIndex++} header='' ItemID={i+1}/>);

          if (col > this.state.numberofgroups){
            col = 1;
          }
          if (((i+1)/this.state.numberofgroups) % 1 === 0){
            itemsList.push(<br key={keyIndex++}/>);
            row++
          }
        }

        if ((col-1) < this.state.numberofgroups) {
            itemsList.push(<br key={keyIndex++}/>);
        }

        if (!this.state.EnableCal) {
          break;
        }
      }
    }

    this.namesList = this.namesList.toString().replace(",", "");
    //console.log(this.namesList)

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">MTC Table Grouping version 1.0 {'  '} 
            <Button color="danger" size="sm" onClick={this.addpeople}>Add People&Group Number</Button>
            <Button color="warning" size="sm" onClick={this.addnames}>Add Names</Button>
            <Button color="info" size="sm" onClick={this.printresults}>Calculate</Button>
            <Button color="primary" size="sm" onClick={this.about}>About</Button>
          </h1>
        </header>
        <Modal isOpen={this.state.modal} toggle={this.toggle}
                    className="modal-primary" autoFocus={false}>
                    <ModalHeader toggle={this.toggle}>Input Number</ModalHeader>
                    <InputForm
                        numberofpeople={this.state.numberofpeople}
                        numberofgroups={this.state.numberofgroups}
                        onSubmit={this.handleSubmit}
                        onToggle={this.toggle} 
                        onPeopleChange={this.onInputPeopleChange}
                        onGroupsChange={this.onInputGroupsChange}/>
        </Modal>
        <Modal isOpen={this.state.modalNames} toggle={this.toggleNames}
                    className="modal-primary" autoFocus={false}>
                    <ModalHeader toggle={this.toggleNames}>Define Names</ModalHeader>
                    <InputNames
                        numberofpeople={this.state.numberofpeople}
                        onSubmit={this.handleSubmitNames}
                        onToggle={this.toggleNames}
                        data={this.namesList} />
        </Modal>
        <br/>
        {itemsList}
        <br/>
      </div>
    );
  }
}

export default App;
