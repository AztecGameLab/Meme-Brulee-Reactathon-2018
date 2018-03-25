import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import React, { Component } from "react";
import axios from "axios";

import logo from "./../../memelikey.svg";
import meme from "./../example_meme/pepe.jpg";
import { Breadcrumb, Col, Layout, Menu, Row } from "antd";
const { Header, Content, Footer } = Layout;

function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

class Room extends Component {
  processImage = () => {
    const uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    const subscriptionKey = process.env.REACT_APP_FACE_API_KEY;
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

  headerStyle = {
    position: "absolute",
    overflow: "hidden",
    height: "64px",
    width: "100%",
    top: 0,
    left: 0
  };

  menuStyle = {
    lineHeight: "64px",
    color: "#fff"
  };

  contentStyle = {
    position: "absolute",
    overflow: "auto",
    width: "100%",
    background: "#cccccc",
    padding: "0 50px",
    top: 64,
    bottom: 64
  };

  breadcrumbStyle = {
    margin: "16px 0"
  };

  boxStyle = {
    height: "75vh",
    background: "#fff",
    padding: 24
  };

  footerStyle = {
    position: "absolute",
    overflow: "hidden",
    height: "64px",
    width: "100%",
    left: 0,
    bottom: 0,
    textAlign: "center"
  };

  render() {
    return (
      <div className="App">
        <Layout className="layout" style={{ height: "100vh" }}>
          <Header style={this.headerStyle}>
            <Menu theme="dark" mode="horizontal" style={this.menuStyle}>
              <Menu.Item style={this.menuStyle}>MEMELIKEY</Menu.Item>
            </Menu>
          </Header>
          <Content style={this.contentStyle}>
            <Breadcrumb style={this.breadcrumbStyle}>
              <Breadcrumb.Item>Welcome to the "Variable Name of Room" Room!</Breadcrumb.Item>
            </Breadcrumb>
            <Row type="flex" justify="space-around">
              <Col span={14}>
                <div style={this.boxStyle}>
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
              </Col>
              <Col span={8}>
                <div style={this.boxStyle}>
                  <center>
                    Meme Template goes here!
                    <img src={meme} height="80%" width="80%" alt="meme" />
                  </center>
                </div>
              </Col>
            </Row>
          </Content>
          <Footer style={this.footerStyle}>Reactathon Hackathon © 2018 Created by Aztec Game Lab (Possible chat area)</Footer>
        </Layout>
      </div>
    );
  }
}

export default Room;
