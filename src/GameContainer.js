import React, { Component } from 'react';
import Game from './Game';
import './Game.css'

class GameContainer extends Component {

  _cellMap = {}
  _genInterval = null
  _cols = 40
  _rows = 40

  state = {
    cells: [],
    gen: 1,
    running: false,
    density: .25,
    boundary: 'toroidal',
    cols: this._cols,
    rows: this._rows,
    cellSize: 500 / this._cols
  }

  componentWillMount() {
    this.randomizeCells()
  }

  randomizeCells = () => {
    // Set the initial state for the cells and
    // keep them in an array to maintain order
    const cells = []

    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {
        // Randomize inital alive cells
        const alive = Math.random() < this.state.density
        cells.push({ row, col, alive })
      }
    }

    // Create an object map for the cells for rapid
    // lookup later
    this.writeCellMap(cells)

    this.setState({
      running: false,
      gen: 1,
      cells,
      cellSize: 500 / this.state.cols
    })
  }

  nextGeneration = () => {
    const cells = []

    for (let row = 0; row < this.state.rows; row++) {
      for (let col = 0; col < this.state.cols; col++) {

        const numAliveNeighbours = [
          this.isCellAlive(row, this.colShift(col, 'right')),
          this.isCellAlive(row, this.colShift(col, 'left')),
          this.isCellAlive(this.rowShift(row, 'down'), col),
          this.isCellAlive(this.rowShift(row, 'up'), col),
          this.isCellAlive(this.rowShift(row, 'down'), this.colShift(col, 'right')),
          this.isCellAlive(this.rowShift(row, 'down'), this.colShift(col, 'left')),
          this.isCellAlive(this.rowShift(row, 'up'), this.colShift(col, 'right')),
          this.isCellAlive(this.rowShift(row, 'up'), this.colShift(col, 'left')),
        ].filter(a => a).length

        const currentlyAlive = this.isCellAlive(row, col)
        const willLive = (numAliveNeighbours === 2 && currentlyAlive) || numAliveNeighbours === 3

        cells.push({ row, col, alive: willLive })
      }
    }

    // rewrite cell map
    this.writeCellMap(cells)
    this.setState({ cells, gen: this.state.gen + 1 })
  }

  isCellAlive = (row, col) => {
    return this._cellMap[`${row}-${col}`]
  }

  writeCellMap = (cellsArr) => {
    cellsArr.forEach(cell => {
      this._cellMap[`${cell.row}-${cell.col}`] = cell.alive
    })
  }

  rowShift = (row, direction) => {
    if (direction === 'up') {

      if (row === 0 && this.state.boundary === 'toroidal') {
        return this.state.rows - 1
      }

      return row - 1

    } else if (direction === 'down') {

      if (row === this.state.rows - 1 && this.state.boundary === 'toroidal') {
        return 0
      }

      return row + 1
    }

    throw new Error('Direction must be "up" or "down"')
  }

  colShift = (col, direction) => {
    if (direction === 'left') {

      if (col === 0 && this.state.boundary === 'toroidal') {
        return this.state.cols - 1
      }

      return col - 1

    } else if (direction === 'right') {

      if (col === this.state.cols - 1 && this.state.boundary === 'toroidal') {
        return 0
      }

      return col + 1
    }

    throw new Error('Direction must be "left" or "right"')
  }


  // UI event handlers

  handleStartStopClick = () => {
    if (this.state.running) {
      clearInterval(this._genInterval)
    } else {
      this._genInterval = setInterval(this.nextGeneration, 100)
    }
    this.setState({ running: !this.state.running })
  }

  handleRandomizeClick = () => {
    clearInterval(this._genInterval)
    this.randomizeCells()
  }

  handleCellClick = (e) => {
    const row = parseInt(e.target.dataset.row, 10)
    const col = parseInt(e.target.dataset.col, 10)
    const cells = this.state.cells

    const cell = cells.find(c => {
      return c.row === row && c.col === col
    })

    cell.alive = !cell.alive

    this._cellMap[`${row}-${col}`] = cell.alive
    this.setState({ cells })
  }

  handleDensityChange = (e) => {
    this.setState({
      density: e.target.value
    })
  }

  handleBoundaryChange = (e) => {
    this.setState({
      boundary: e.target.value
    })
  }

  handleRowsChange = (e) => {
    this.setState({
      rows: e.target.value
    })
  }

  handleColsChange = (e) => {
    this.setState({
      cols: e.target.value
    })
  }

  handleClearClick = () => {
    const cells = this.state.cells

    cells.forEach(c => {
      c.alive = false
    })

    clearInterval(this._genInterval)

    this.writeCellMap(cells)

    this.setState({
      cells,
      running: false,
      gen: 1
    })
  }

  render() {
    return (
      <Game
        cellSize={this.state.cellSize}
        gen={this.state.gen}
        cells={this.state.cells}
        cols={this.state.cols}
        rows={this.state.rows}
        density={this.state.density}
        boundary={this.state.boundary}
        running={this.state.running}
        onCellClick={this.handleCellClick}
        onStartStopClick={this.handleStartStopClick}
        onRandomizeClick={this.handleRandomizeClick}
        onDensityChange={this.handleDensityChange}
        onBoundaryChange={this.handleBoundaryChange}
        onRowsChange={this.handleRowsChange}
        onColsChange={this.handleColsChange}
        onClearClick={this.handleClearClick}
      />
    )
  }
}

export default GameContainer;
