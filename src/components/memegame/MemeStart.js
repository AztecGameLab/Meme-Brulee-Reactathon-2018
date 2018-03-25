import React from "react";

//Components
import { Button, Icon } from "antd";
import logo from "../../../src/memelikey.svg";

const MemeStart = props => {
  return (
    <div>
      <img src={logo} height="140" width="140" alt="logo" />
      <h1>Get ready to cook!</h1>
      <p>Welcome to Aztec Game Lab's Memeathon!</p>
      <p>You will be playing a game where you caption a random meme!</p>
      <p>Once everyone is ready, click play!</p>
      <br />
      <br />
      <br />
      <br />
      <Button type="primary" onClick={props.playGame} size="large">
        Start Game<Icon type="check" />
      </Button>
    </div>
  );
};

export default MemeStart;
