import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css'

class Grid extends Component {
  render() {
    const style = {
      width: `${this.props.cols * 10}px`
    }

    const cells = this.props.cells.map((cell, index) =>
      <Cell alive={cell.alive} key={index} id={`${cell.row}-${cell.col}`} onClick={this.props.onCellClick} />)

    return (
      <div className="Grid" style={style}>
        {cells}
      </div>
    )
  }
}

export default Grid;
