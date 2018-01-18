import React, { Component } from 'react';
import Cell from './Cell';
import './Grid.css'

class Grid extends Component {
  render() {
    const cells = this.props.cells.map((cell, index) =>
      <Cell key={index}
        alive={cell.alive}
        row={cell.row}
        col={cell.col}
        onCellClick={this.props.onCellClick}
        size={this.props.cellSize} />)

    const style = {
      border: this.props.boundary === 'dead' ? '1px solid black' : '1px solid transparent'
    }

    return (
      <div className="Grid" style={style}>
        {cells}
      </div>
    )
  }
}

export default Grid;
