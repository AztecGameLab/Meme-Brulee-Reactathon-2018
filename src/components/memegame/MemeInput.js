import React from "react";

//Components
import { Input } from "antd";

const MemeInput = props => {
  return (
    <div>
      <img src={props.currentTemplate.url} alt="Loading Your Meme Template" />
      <Input placeholder="Top Caption..." onChange={e => props.handleTop(e, "text0")} />
      <Input placeholder="Bottom Caption..." onChange={e => props.handleBot(e, "text1")} />
    </div>
  );
};

export default MemeInput;
