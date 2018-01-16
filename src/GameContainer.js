import React, { Component } from 'react';
import Game from './Game';
import './Game.css'

class GameContainer extends Component {

  _cellMap = {}
  _genInterval = null

  state = {
    cells: [],
    gen: 1,
    running: false,
    density: .25
  }

  componentWillMount() {
    this.randomizeCells()
  }

  randomizeCells = () => {
    // Set the initial state for the cells and
    // keep them in an array to maintain order
    const cells = []

    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {

        // Randomize inital alive cells
        const alive = Math.random() < this.state.density

        //const alive = this._alive.includes(`${row}-${col}`)

        cells.push({ row, col, alive })
      }
    }

    // Create an object map for the cells for rapid
    // lookup later
    this.writeCellMap(cells)
    this.setState({ cells })
  }

  isCellAlive = (row, col) => {
    return this._cellMap[`${row}-${col}`]
  }

  writeCellMap = (cellsArr) => {
    cellsArr.forEach(cell => {
      this._cellMap[`${cell.row}-${cell.col}`] = cell.alive
    })
  }

  cellWillLive = (row, col) => {
    const isAlive = this.isCellAlive(row, col)

    const numAliveNeighbours = [
      this.isCellAlive(row, col+1),
      this.isCellAlive(row, col-1),
      this.isCellAlive(row+1, col),
      this.isCellAlive(row+1, col+1),
      this.isCellAlive(row+1, col-1),
      this.isCellAlive(row-1, col),
      this.isCellAlive(row-1, col+1),
      this.isCellAlive(row-1, col-1),
    ].filter(a => a).length

    return (numAliveNeighbours === 2 && isAlive) || numAliveNeighbours === 3
  }

  nextGeneration = () => {
    const cells = []

    for (let row = 0; row < this.props.rows; row++) {
      for (let col = 0; col < this.props.cols; col++) {
        const alive = this.cellWillLive(row, col)
        cells.push({ row, col, alive })
      }
    }

    // rewrite cell map
    this.writeCellMap(cells)
    this.setState({ cells, gen: this.state.gen + 1 })
  }

  handleStartStopClick = () => {
    if (this.state.running) {
      clearInterval(this._genInterval)
    } else {
      this._genInterval = setInterval(this.nextGeneration, 100)
    }
    this.setState({ running: !this.state.running })
  }

  handleInitClick = () => {
    this.setState({
      running: false,
      gen: 1
    })
    clearInterval(this._genInterval)
    this.randomizeCells()
  }

  handleDensityChange = (e) => {
    this.setState({
      density: e.target.value
    })
  }

  render() {
    return (
      <Game cellSize={Math.floor(500 / this.props.cols)}
        gen={this.state.gen}
        cells={this.state.cells}
        density={this.state.density}
        running={this.state.running}
        onCellClick={this.handleCellClick}
        onStartStopClick={this.handleStartStopClick}
        onInitClick={this.handleInitClick}
        onDensityChange={this.handleDensityChange}
      />
    )
  }
}

export default GameContainer;
