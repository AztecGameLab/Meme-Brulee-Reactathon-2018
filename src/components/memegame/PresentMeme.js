import React, { Component } from "react";
import { Carousel, Button } from "antd";

//Selectors
import { selectReceivedMemes } from "../../features/meme/memeSelectors";

class PresentMeme extends Component {
  render() {
    const { memesToPresent, playAgain } = this.props;
    const imageList = memesToPresent.map(meme => {
      return <img key={meme.url} style={imageStyle} src={meme.url} alt="Loading Your Friends' Memes" />;
    });
    return (
      <div>
        <Carousel autoplay>{imageList}</Carousel>
        <Button onClick={playAgain}> Play Again</Button>
      </div>
    );
  }
}

export default PresentMeme;

const imageStyle = {
  height: '600px !important',
  width: '800px !important'
};
