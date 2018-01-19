import React, { Component } from 'react';
import Grid from './Grid';
import './Game.css'

class Game extends Component {
  render() {
    return (
      <div className="Game">

        <div className="Game-settings">

          <fieldset disabled={this.props.running}>
            <div className="Game-input-group">
              Size:
              <select value={this.props.size} onChange={this.props.onSizeChange}>
                <option value={10}>Tiny</option>
                <option value={20}>Small</option>
                <option value={30}>Medium</option>
                <option value={40}>Large</option>
                <option value={50}>Huge</option>
              </select>
            </div>

            <div className="Game-input-group">
              Density:
              <select value={this.props.density} onChange={this.props.onDensityChange}>
                <option value={.02}>Lonely</option>
                <option value={.1}>Scarce</option>
                <option value={.375}>Balanced</option>
                <option value={.5}>Crowded</option>
                <option value={.7}>Overpopulated</option>
              </select>
            </div>

            <div className="Game-input-group">
              Boundary Condition:
              <input type="radio" value="toroidal"
                checked={this.props.boundary === 'toroidal'}
                onChange={this.props.onBoundaryChange} /> Toroidal
              <input type="radio" value="dead"
                checked={this.props.boundary === 'dead'}
                onChange={this.props.onBoundaryChange} /> Dead
            </div>
          </fieldset>

          <div className="Game-input-group">
            Speed:
            <input type="radio" value={1000}
              checked={this.props.speed === 1000}
              onChange={this.props.onSpeedChange} /> Boring
            <input type="radio" value={700}
              checked={this.props.speed === 700}
              onChange={this.props.onSpeedChange} /> Slow
            <input type="radio" value={100}
              checked={this.props.speed === 100}
              onChange={this.props.onSpeedChange} /> Fast
            <input type="radio" value={50}
              checked={this.props.speed === 50}
              onChange={this.props.onSpeedChange} /> Too fast
          </div>
        </div>

        <div className="Game-grid-header">
          <div className="Game-button-group">
            <button onClick={this.props.onStartStopClick}>{this.props.running ? 'Stop' : 'Start'}</button>
            <button onClick={this.props.onClearClick}>Clear</button>
            <button onClick={this.props.onRandomizeClick}>Randomize</button>
          </div>
          Generation: {this.props.gen}
        </div>

        <Grid cellSize={this.props.cellSize}
          cells={this.props.cells}
          boundary={this.props.boundary}
          onCellClick={this.props.onCellClick} />
        <br/>

      </div>
    )
  }
}

export default Game;
