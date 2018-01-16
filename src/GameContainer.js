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

  _alive2 = [
    '20-11',
    '20-14',
    '22-23',
    '20-10',
    '24-30',
    '24-23',
    '21-14',
    '24-18',
    '23-27',
    '22-28',
    '24-20',
    '23-29',
    '23-10',
    '20-16',
  ]

  _alive3 = [
    '21-10',
    '22-16',
    '24-21',
    '22-19',
    '24-25',
    '23-20',
    '24-12',
    '23-25',
    '22-20',
    '22-18',
    '22-24',
    '23-18',
    '22-29',
    '24-19',
    '24-14',
  ]

  _alive = [
    '20-12',
    '22-10',
    '22-11',
    '22-12',
    '24-10',
    '24-11',
    '22-14',
    '23-14',
    '23-16',
    '24-16',
    '22-25',
    '23-23',
    '22-27',
    '24-27',
    '24-28',
    '24-29',
  ]

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

    const good = (numAliveNeighbours === 2 && isAlive) || numAliveNeighbours === 3

    if (this.state.gen > 100) {
      const dim = 1/(this.state.gen - 99)
      return Math.random() < dim || this._alive.includes(`${row}-${col}`)
        ||this._alive2.includes(`${row}-${col}`)
        ||this._alive3.includes(`${row}-${col}`)
    } else if (this.state.gen > 80) {
      return good || this._alive.includes(`${row}-${col}`)
        ||this._alive2.includes(`${row}-${col}`)
        ||this._alive3.includes(`${row}-${col}`)
    } else if (this.state.gen > 60) {
      return good || this._alive2.includes(`${row}-${col}`)
        ||this._alive3.includes(`${row}-${col}`)
    } else if (this.state.gen > 40) {
      return good || this._alive2.includes(`${row}-${col}`)
    } else {
      return good
    }
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
