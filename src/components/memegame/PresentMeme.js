import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import { Carousel, Button } from "antd";
import Emoji from "react-emoji-render";

//Selectors
import { selectReceivedMemes } from "../../features/meme/memeSelectors";
import { selectEmojiMap } from "../../features/users/UserSelectors";

class PresentMeme extends Component {
  state = {
    emotionTimer: null
  };

  componentDidMount() {
    const { getMyEmotions, sendMyEmotions } = this.props;
    let emotionGauge = setInterval(() => {
      getMyEmotions();
      sendMyEmotions();
    }, 3000);
    this.setState({
      emotionTimer: emotionGauge
    });
  }
  componentWillUnmount() {
    this.clearInterval(this.state.emotionTimer);
  }

  render() {
    const { memesToPresent, playAgain, emojiObj } = this.props;
    const imageList = memesToPresent.map(meme => {
      return (
        <div>{this.props.player}
          <img key={meme.url} src={meme.url} alt="Loading Your Friends' Memes" />;
        </div>
      );
    });
    const emojiList = emojiObj.map(emotion => {
      return <Emoji key={emotion.emoji} text={emotion.emoji + " " + emotion.val} />;
    });
    return (
      <div>
        <Carousel autoplay>{imageList}</Carousel>
        <Button onClick={playAgain}> Play Again</Button>
        <span>{emojiList}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.userState,
    memesToPresent: selectReceivedMemes(state),
    emojiObj: selectEmojiMap(state)
  };
};

export default connect(mapStateToProps, null)(PresentMeme);
