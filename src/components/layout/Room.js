import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import React, { Component } from 'react';
import {Button} from 'antd';

class Room extends Component {
    subscriberProperties = {
        preferredFrameRate: 15,
        showControls: false
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
              <OTPublisher />
              <OTStreams>
                <OTSubscriber properties={this.subscriberProperties} eventHandlers={this.subscriberEventHandlers} />
              </OTStreams>
            </OTSession>
            <Button>HELLO</Button>
            <Button>YOU</Button>
            </div>
        );
    }
}

export default Room;