import React, { Component } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Test";

class App extends Component {
  render() {
    return (
      <div className="App">
        <OTSession apiKey={process.env.REACT_APP_TOK_KEY} sessionId={process.env.REACT_APP_SESSION_ID} token={process.env.REACT_APP_TOK_SECRET}>
          <OTPublisher />
          <OTStreams>
            <OTSubscriber />
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}

export default App;
