import React, { Component } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  subscriberProperties = {
    preferredFrameRate: 15,
    showControls: false
  };

  processImage = () => {
    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    const subscriptionKey = "be1829ee303445fc93097146f9454cfa";
    var b64Data = this.publisherRef.getPublisher().getImgData();
    const imgBuffer = _base64ToArrayBuffer(b64Data);
    // const imgData = URL.createObjectURL(blob);
    // Request parameters.
    var params = {
      returnFaceId: "true",
      returnFaceLandmarks: "false",
      returnFaceAttributes: "smile,emotion"
    };

    const paramSerialized = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

    const url = uriBase + "?" + paramSerialized;
    console.log(url);
    axios({
      url: url,
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      },
      data: imgBuffer
    }).then(response => {
      console.log(response.data);
    });
  };

  subscriberEventHandlers = {
    videoDisabled: event => {
      console.log("Subscriber video disabled!");
    },
    videoEnabled: event => {
      console.log("Subscriber video enabled!");
    }
  };

  render() {
    return (
      <div className="App">
        <OTSession apiKey={process.env.REACT_APP_API_KEY} sessionId={process.env.REACT_APP_SESSION_ID} token={process.env.REACT_APP_TOKEN_ID}>
          <OTPublisher
            ref={instance => {
              this.publisherRef = instance;
            }}
          />
          <OTStreams>
            <OTSubscriber properties={this.subscriberProperties} eventHandlers={this.subscriberEventHandlers} />
          </OTStreams>
        </OTSession>

        <button onClick={this.processImage}>Click me </button>
      </div>
    );
  }
}

export default App;
