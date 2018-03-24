import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Test";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Test key: {process.env.REACT_APP_TOK_KEY}
          To get started, edit <code>src/App.js</code> and save to reload.
          <Test />
        </p>
      </div>
    );
  }
}

export default App;
