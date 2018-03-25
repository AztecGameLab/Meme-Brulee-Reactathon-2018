import React from "react";

import { Button } from "antd";

const MemeStart = props => {
  return (
    <div>
      <h1>Game Starting Page</h1>
      <p>Once everyone is ready, click play!</p>
      <Button onClick={props.playGame}>Start Game</Button>
    </div>
  );
};

export default MemeStart;
