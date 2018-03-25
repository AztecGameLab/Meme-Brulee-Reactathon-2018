import React, { Component } from "react";
import Room from "../layout/Room";
import { Card, Input, Modal } from "antd";

class App extends Component {
  state = {
    publisherName: "",
    modal: true
  };

  handleUsername = data => {
    debugger;
    this.setState({
      publisherName: data.target.value
    });
  };

  handleOk = () => {
    this.setState({ modal: false });
  };

  render() {
    if (this.state.modal) {
      return (
        <Modal title="Welcome to meme brulee" visible={this.state.modal} onOk={this.handleOk}>
          <Card title="Please enter your name!" style={{ width: 300 }}>
            <Input onChange={this.handleUsername} />
          </Card>
        </Modal>
      );
    } else {
      return (
        <div>
          <Room publisherName={this.state.publisherName} />
        </div>
      );
    }
  }
}

export default App;
