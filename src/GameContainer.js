import React, { Component } from 'react';
import Game from './Game';
import './Game.css'

class GameContainer extends Component {

  _cellMap = {}
  _genInterval = null
  _size = 40

  // Defaults
  state = {
    cells: [],
    gen: 1,
    running: false,
    density: .375,
    boundary: 'toroidal',
    size: this._size,
    cellSize: 500 / this._size,
    speed: 100
  }

  // This is called then the game is first rendered.
  // Initialize the cells with the default grid size
  // and density
  componentWillMount() {
    this.randomizeCells(this.state.size, this.state.density)
  }

  // Writes the cell object map from the cell array
  writeCellMap = (cellsArr) => {
    cellsArr.forEach(cell => {
      this._cellMap[`${cell.row}-${cell.col}`] = cell.alive
    })
  }

  randomizeCells = (size, density) => {
    // Set the initial state for the cells and
    // keep them in an array to maintain order
    const cells = []

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        cells.push({
          row,
          col,
          alive: Math.random() < density
        })
      }
    }

    // In case it was running
    clearInterval(this._genInterval)

    // Create an object map for the cells for rapid
    // lookup later
    this.writeCellMap(cells)

    // Update the cells and the new size and density
    // (if they changed)
    this.setState({
      size,
      density,
      cells,
      cellSize: 500 / size,
      gen: 1,
      running: false
    })
  }

  // These 'getPosition' functions help abtract the idea of an
  // adjacent cell so we can easily have both toroidal and dead boundary
  // conditions.
  getForwardPosition = (pos) => {
    if (pos === this.state.size - 1 && this.state.boundary === 'toroidal') {
      return 0
    }

    return pos + 1
  }

  getBackwardPosition = (pos) => {
    if (pos === 0 && this.state.boundary === 'toroidal') {
      return this.state.size - 1
    }

    return pos - 1
  }

  // This is called for every generation
  nextGeneration = () => {
    const cells = []

    for (let row = 0; row < this.state.size; row++) {
      // Get adjacent rows, considering the current
      // boundary condition
      const forwardRow = this.getForwardPosition(row)
      const backwardRow = this.getBackwardPosition(row)

      for (let col = 0; col < this.state.size; col++) {
        // Get adjacent cols, considering the current
        // boundary condition
        const forwardCol = this.getForwardPosition(col)
        const backwardCol = this.getBackwardPosition(col)

        // Look up all neighbor cells and count how many are alive
        const numAliveNeighbours = [
          this._cellMap[`${row}-${forwardCol}`],
          this._cellMap[`${row}-${backwardCol}`],
          this._cellMap[`${forwardRow}-${col}`],
          this._cellMap[`${backwardRow}-${col}`],
          this._cellMap[`${forwardRow}-${forwardCol}`],
          this._cellMap[`${forwardRow}-${backwardCol}`],
          this._cellMap[`${backwardRow}-${forwardCol}`],
          this._cellMap[`${backwardRow}-${backwardCol}`],
        ].filter(a => a).length

        // Check the current cell
        const alive = this._cellMap[`${row}-${col}`]

        // Logic based on the rules from
        // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
        const willLive = (numAliveNeighbours === 2 && alive) || numAliveNeighbours === 3

        cells.push({ row, col, alive: willLive })
      }
    }

    // Rewrite cell map
    this.writeCellMap(cells)

    this.setState({ cells, gen: this.state.gen + 1 })
  }


  // UI event handlers

  handleStartStopClick = () => {
    if (this.state.running) {
      clearInterval(this._genInterval)
    } else {
      this._genInterval = setInterval(this.nextGeneration, this.state.speed)
    }

    this.setState({ running: !this.state.running })
  }

  handleRandomizeClick = () => {
    this.randomizeCells(this.state.size, this.state.density)
  }

  // Kills all cells, and stops iteration if running
  handleClearClick = () => {
    this.state.cells.forEach(c => {
      c.alive = false
    })

    clearInterval(this._genInterval)

    this.writeCellMap(this.state.cells)

    this.setState({
      cells: this.state.cells,
      running: false,
      gen: 1
    })
  }

  // Toggles individual cell life. The cell dom object contains
  // its own row and column in data attributes, which is how we
  // identify it here
  handleCellClick = (e) => {
    if (!this.state.running) {
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
  }

  // Re-render the cells with a new density
  handleDensityChange = (e) => {
    this.randomizeCells(this.state.size, e.target.value)
  }

  handleBoundaryChange = (e) => {
    this.setState({
      boundary: e.target.value
    })
  }

  // Re-render the cells with a new grid size
  handleSizeChange = (e) => {
    this.randomizeCells(e.target.value, this.state.density)
  }

  // When they change the speed, reset the generation interval if
  // the game is running
  handleSpeedChange = (e) => {
    if (this.state.running) {
      clearInterval(this._genInterval)
      this._genInterval = setInterval(this.nextGeneration, e.target.value)
    }

    this.setState({
      speed: parseInt(e.target.value, 10)
    })
  }

  render() {
    return (
      <Game
        cellSize={this.state.cellSize}
        gen={this.state.gen}
        cells={this.state.cells}
        size={this.state.size}
        density={this.state.density}
        boundary={this.state.boundary}
        running={this.state.running}
        speed={this.state.speed}
        onCellClick={this.handleCellClick}
        onStartStopClick={this.handleStartStopClick}
        onRandomizeClick={this.handleRandomizeClick}
        onClearClick={this.handleClearClick}
        onDensityChange={this.handleDensityChange}
        onBoundaryChange={this.handleBoundaryChange}
        onSizeChange={this.handleSizeChange}
        onSpeedChange={this.handleSpeedChange}
      />
    )
  }
}

export default GameContainer;
