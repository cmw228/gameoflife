import React, { Component } from 'react';
import Grid from './Grid';
import './Game.css'

class Game extends Component {
  render() {

    const floatRight = {
      float: 'right'
    }

    return (
      <div className="Game">
        <div className="Game-header">
          Generation: {this.props.gen}
        </div>

        <Grid cellSize={this.props.cellSize}
          cells={this.props.cells}
          boundary={this.props.boundary}
          onCellClick={this.props.onCellClick} />
        <br/>


        <div className="Game-controls">

          <button onClick={this.props.onStartStopClick}>{this.props.running ? 'Stop' : 'Start'}</button>
          <button onClick={this.props.onClearClick}>Clear</button>

          <span className="Game-boundary-conditions">
            Boundary Condition:
            <input type="radio" value="toroidal"
              checked={this.props.boundary === 'toroidal'}
              onChange={this.props.onBoundaryChange} /> Toroidal
            <input type="radio" value="dead"
              checked={this.props.boundary === 'dead'}
              onChange={this.props.onBoundaryChange} /> Dead
          </span>

        </div>

        <hr/>

        <div className="Game-input-group">
          Initial Density:
          <input type="text" value={this.props.density} onChange={this.props.onDensityChange} />
          <div>{ (this.props.density < 0 || this.props.density > 1) && 'density must be between 0 and 1' }</div>
        </div>

        <div className="Game-input-group">
          Size:
          <input type="text" value={this.props.cols} onChange={this.props.onColsChange} />
          by
          <input type="text" value={this.props.rows} onChange={this.props.onRowsChange} />
          cells
        </div>

        <div className="Game-input-group">
          <button onClick={this.props.onRandomizeClick}>Apply</button>
        </div>
      </div>
    )
  }
}

export default Game;
