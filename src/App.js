import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Room from "./components/layout/Room";
import Test from "./components/Test";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Room></Room>
      </div>
    );
  }
}

export default App;
