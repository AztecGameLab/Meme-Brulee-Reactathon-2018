import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import { Carousel } from "antd";

//Selectors
import { selectReceivedMemes } from "../../features/meme/memeSelectors";

class PresentMeme extends Component {
  render() {
    const { memesToPresent } = this.props;
    const imageList = memesToPresent.map(meme => {
      return (
        <div key={meme.url}>
          <img key={meme.url} src={meme.url} alt="Loading Your Friends' Memes" />;
        </div>
      );
    });
    return (
      <div>
        <Carousel autoplay>{imageList}</Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    memesToPresent: selectReceivedMemes(state),
    player: state.userState
  };
};

export default connect(mapStateToProps, null)(PresentMeme);
