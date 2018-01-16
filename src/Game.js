import React, { Component } from 'react';
import Grid from './Grid';
import './Game.css'

class Game extends Component {

  _cellMap = {}

  state = {
    cells: [],
    gen: 1
  }

  cellWillLive = (isAlive, row, col) => {
    const adjacentCells = [
      this._cellMap[`${row}-${col+1}`],
      this._cellMap[`${row}-${col-1}`],
      this._cellMap[`${row+1}-${col}`],
      this._cellMap[`${row+1}-${col+1}`],
      this._cellMap[`${row+1}-${col-1}`],
      this._cellMap[`${row-1}-${col+1}`],
      this._cellMap[`${row-1}-${col}`],
      this._cellMap[`${row-1}-${col-1}`]
    ]

    let aliveNeighbours = 0

    adjacentCells.forEach((alive) => {
      if (alive) aliveNeighbours++
    })

    if (isAlive) {
      return aliveNeighbours === 2 || aliveNeighbours === 3
    } else {
      return aliveNeighbours === 3
    }
  }

  nextGeneration = () => {
    const cells = []

    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        const alive = this.cellWillLive(this._cellMap[`${row}-${col}`], row, col)
        cells.push({ row, col, alive })
      }
    }

    // update cell map
    cells.forEach((cell) => {
      this._cellMap[`${cell.row}-${cell.col}`] = cell.alive
    })

    this.setState({ cells, gen: this.state.gen + 1 })
  }

  start = () => {
    const interval = setInterval(this.nextGeneration, 200)
  }

  componentWillMount() {
    const cells = []

    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {

        //const alive = aliveList.includes(`${row}-${col}`)
        const alive = Math.random() > .7

        cells.push({ row, col, alive })
        this._cellMap[`${row}-${col}`] = alive
      }
    }

    this.setState({ cells })
  }

  render() {
    return (
      <div className="GridContainer">
        Generation: {this.state.gen}<br/>
        <Grid cols={this.props.cols} cells={this.state.cells} onCellClick={this.handleCellClick} />
        <br/>
        <button onClick={this.start}>Start</button>
      </div>
    )
  }
}

export default Game;
