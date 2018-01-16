import React, { Component } from 'react';
import './App.css';
import Game from './Game';

class App extends Component {
  render() {
    const rows = 50
    const cols = 50

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <p className="App-intro">
        </p>

        <Game rows={rows} cols={cols} />
      </div>
    );
  }
}

export default App;
