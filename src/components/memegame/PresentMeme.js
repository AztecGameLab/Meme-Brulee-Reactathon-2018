import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import { Carousel, Button } from "antd";

//Selectors
import { selectReceivedMemes } from "../../features/meme/memeSelectors";

class PresentMeme extends Component {
  render() {
    const { memesToPresent, playAgain } = this.props;
    const imageList = memesToPresent.map(meme => {
      return <img key={meme.url} src={meme.url} alt="Loading Your Friends' Memes" />;
    });
    return (
      <div>
        <Carousel autoplay>{imageList}</Carousel>
        <Button onClick={playAgain}> Play Again</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    memesToPresent: selectReceivedMemes(state)
  };
};

export default connect(mapStateToProps, null)(PresentMeme);
