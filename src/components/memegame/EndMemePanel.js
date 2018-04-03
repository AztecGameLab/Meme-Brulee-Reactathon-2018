import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import Emoji from "react-emoji-render";
import { Button, Icon } from "antd";

//Selectors
import { selectEmojiMap } from "../../features/users/UserSelectors";

class EndMemePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    //Initial Emotion Grab
    const { getMyEmotions } = this.props;
    const { sendMyEmotions } = this.props;
    let { counter } = this.state;
    while (counter < 2) {
      getMyEmotions().then(async myEmotions => {
        await sendMyEmotions();
      });
      counter++;
      this.setState({
        counter
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.emotionTimer);
  }

  render() {
    const { emojiObj, playAgain } = this.props;
    const emojiList = emojiObj.map(emotion => {
      return <Emoji key={emotion.emoji} text={emotion.emoji + " " + emotion.val} />;
    });
    return (
      <div>
        <h1>Capturing your React(.jsx)ions!</h1>
        <br />
        <br />
        <p>Please minimize and resize the window if a picture does not show up.</p>
        <p>Each player is analyzed for your emotional response to the memetastic creations! :)</p>
        <br />
        <br />
        <span style={{ fontSize: "30px" }}>{emojiList}</span>
        <br />
        <br />
        <br />
        <br />
        <p>Did you like it?</p>
        <Button size="large" type="primary" onClick={playAgain}>
          <Icon type="reload" />
          Play Again!
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersState,
    emojiObj: selectEmojiMap(state)
  };
};

export default connect(mapStateToProps, null)(EndMemePanel);
