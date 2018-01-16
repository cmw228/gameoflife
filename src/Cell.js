import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    const style = {
      backgroundColor: this.props.alive ? '#000000' : '#dddddd',
      width: `${this.props.size - 2}px`,
      height: `${this.props.size - 2}px`
    }

    return (
      <div className="Cell"
        style={style}
        onClick={this.props.onClick}
        data-id={this.props.id}>
      </div>
    );
  }
}

export default Cell;
