import React, { Component } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./components/Test";

class App extends Component {
  constructor(props) {
    super(props);

    this.publisherProperties = {
      audioFallbackEnabled: false,
      showControls: false
    };

    this.publisherEventHandlers = {
      streamCreated: event => {
        console.log("Publisher stream created!");
      },
      streamDestroyed: event => {
        console.log("Publisher stream destroyed!");
      }
    };
  }
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
