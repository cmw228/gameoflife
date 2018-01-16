import React, { Component } from 'react';
import Grid from './Grid';
import './Game.css'

class Game extends Component {
  render() {
    return (
      <div className="Game">
        Generation: {this.props.gen}<br/>
        <Grid cellSize={this.props.cellSize}
          cells={this.props.cells}
          onCellClick={this.handleCellClick} />
        <br/>
        <button onClick={this.props.onStartStopClick}>{this.props.running ? 'Stop' : 'Start'}</button>
        <button onClick={this.props.onInitClick}>Initialize</button>
        Density:
        <input type="text" value={this.props.density} onChange={this.props.onDensityChange} />
      </div>
    )
  }
}

export default Game;
