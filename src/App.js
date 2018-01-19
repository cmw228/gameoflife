import React, { Component } from 'react';
import './App.css';
import GameContainer from './GameContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <p className="App-intro">
        </p>

        <GameContainer />
      </div>
    );
  }
}

export default App;
