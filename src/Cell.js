import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    const style = {
      backgroundColor: this.props.alive ? '#000000' : '#dddddd',
    }

    return (
        <div className="Cell" style={style} onClick={this.props.onClick} data-id={this.props.id}></div>
    );
  }
}

export default Cell;
