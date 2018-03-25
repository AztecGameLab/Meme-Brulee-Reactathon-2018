import React, { Component } from "react";

//Components
import Emoji from "react-emoji-render";

//Selectors
import { selectReceivedMemes } from "../../features/meme/memeSelectors";
import { selectEmojiMap } from "../../features/users/UserSelectors";

class EndMemePanel extends Component {
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
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    memesToPresent: selectReceivedMemes(state),
    emojiObj: selectEmojiMap(state)
  };
};

export default EndMemePanel;
