import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import { Carousel, Spin } from "antd";

//Selectors
import { selectReceivedMemes } from "../../features/meme/memeSelectors";
import { selectPlayers } from "../../features/users/UserSelectors";

class PresentMeme extends Component {
  render() {
    const { memesToPresent, players } = this.props;
    const imageList = Object.values(players).map(player => {
      return (
        <div key={player.meme}>
          <img key={player.meme} src={player.meme} alt="Loading Your Friends' Memes" />
          <label>{player.name}'s meme!</label>
        </div>
      );
    });
    return (
      <div>
        <span role="img" aria-label="emoji">
          👈 Use your arrow keys to browse the creations! 👉
        </span>
        {memesToPresent.length === Object.keys(players).length ? (
          <Carousel autoplay>{imageList}</Carousel>
        ) : (
          <div key="dankmemes">
            Loading dank memes...
            <Spin size="large" />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    memesToPresent: selectReceivedMemes(state),
    players: selectPlayers(state)
  };
};
export default connect(mapStateToProps, null)(PresentMeme);
