import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css'

class Grid extends Component {
  render() {
    const cells = this.props.cells.map((cell, index) =>
      <Cell key={index}
        alive={cell.alive}
        id={`${cell.row}-${cell.col}`}
        onClick={this.props.onCellClick}
        size={this.props.cellSize} />)

    return (
      <div className="Grid">
        {cells}
      </div>
    )
  }
}

export default Grid;
