import React, { Component } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

import Room from "../layout/Room";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Room />
      </div>
    );
  }
}

export default App;
