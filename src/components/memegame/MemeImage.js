import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-image-resizer";

//Selectors
import { selectCurrentTemplate } from "../../features/meme/memeSelectors";
import { Spin } from "antd";

class MemeImage extends Component {
  render() {
    const { currentTemplate } = this.props;
    return (
      <div>
        {currentTemplate.url ? (
          <Image src={currentTemplate.url} width={"800"} height={"600"} alt="Loading Your Meme Template" />
        ) : (
          <div style={{ textAlign: "center", paddingTop: "30%" }}>
            <Spin size="large" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>Did you know? Crème brûlées are yummy!</h3>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTemplate: selectCurrentTemplate(state)
  };
};

export default connect(mapStateToProps, null)(MemeImage);
