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
          <div>
            <Image src={currentTemplate.url} width={"800"} height={"600"} alt="Loading Your Meme Template" />
          </div>
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
            <h3>Did you know? The Crème brûlée recipe dates back to the 17th century!</h3>
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
