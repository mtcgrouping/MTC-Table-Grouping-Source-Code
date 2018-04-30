import React, { Component } from 'react'
import { Button  } from 'reactstrap';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ItemID: this.props.ItemID,
            col: this.props.col,
            row: this.props.row,
            header: this.props.header,
            numberofgroups: this.props.numberofgroups,
            data: [this.props.col],
            index: this.props.index,
            enableCal: this.props.enableCal,
            name: this.props.name,
            names: this.props.names,
            numberofpeople: this.props.numberofpeople,
            color: "success"
        };
    }

    componentDidMount(){
        this.Calculate(this.state.row, this.state.col, this.state.numberofgroups, this.state.data);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ col: nextProps.col,
                        row: nextProps.row,
                        header: nextProps.header,
                        numberofgroups: nextProps.numberofgroups,
                        data: [nextProps.col],
                        ItemID: nextProps.ItemID,
                        enableCal: nextProps.enableCal,
                        index: nextProps.index,
                        name: nextProps.name,
                        names: nextProps.names,
                        numberofpeople: nextProps.numberofpeople

        });

        this.Calculate(nextProps.row, nextProps.col, nextProps.numberofgroups, nextProps.col);
    }


    Calculate = (row, col, numberofgroups, data) => {
        if (row > 0){
            const newValue = [];
            let pos = col;
            var posName = ((row-1)*numberofgroups+pos).toString();

            newValue.push(posName)

            for (let i=2 ; i<=numberofgroups ; i++){

                pos = pos + row;
                if (pos > numberofgroups){
                    pos = pos - numberofgroups;
                }

                posName = ((row-1)*numberofgroups+pos).toString();

                var found = newValue.find(function(element) {
                    return element === posName;
                });

                if (found === undefined) {
                    newValue.push(posName)
                 } else {
                    pos = pos + 1;
                    if (pos > numberofgroups){
                        pos = pos - numberofgroups;
                    }
                    posName = ((row-1)*numberofgroups+pos).toString();
                    newValue.push(posName)
                 }
            } 
            this.setState({ data: newValue });
            this.props.result(row,col,newValue)
        }
    }

    render() {
        if (this.state.row === 0){
            return (
                <span>
                    <Button style={{width: 70, height: 70}} color="primary" size='sm' onClick={this.onSubmit}>Round{this.state.index+1}<br/>{this.state.header}{this.state.ItemID}</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            )
        } else {
            var fullName = '';
            this.namesList = this.state.names.toString().split("\n");

            if (this.namesList) {
                var fullNameNum = parseInt(this.state.data[this.state.index], 10);
                fullName = this.namesList[fullNameNum-1];
            }

            return (
                <span>
                    <Button style={{width: 70, height: 70}} color={this.state.color} size='sm' onClick={this.onSubmit}>{fullName}</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
            )
        }
    }

    onSubmit = () => {
        if (this.state.color === "success") {
            this.setState({color: "warning"})
        } else {
            this.setState({color: "success"})
        }
    }
}

export default Item