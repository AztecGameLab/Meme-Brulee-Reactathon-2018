import React, { Component } from "react";
import { connect } from "react-redux";
import Image from "react-image-resizer";

//Selectors
import { selectCurrentTemplate } from "../../features/meme/memeSelectors";

class MemeImage extends Component {
  render() {
    const { currentTemplate } = this.props;
    return (
      <div>
        <Image src={currentTemplate.url} width={"800"} height={"600"} alt="Loading Your Meme Template" />
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

//Inline Styles
const imageStyle = {
  justifyContent: "center",
  alignItems: "center",
  position: "absolute"
};
