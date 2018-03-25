import React from "react";

//Components
import { Input, Tag } from "antd";

const MemeInput = props => {
  return (
    <div>
      <h1>Delight us with your meme craft!</h1>
      <br />
      <br />
      <Tag color="blue">This text will go at the top!</Tag>
      <Input placeholder="Enter Top Caption..." onChange={e => props.handleTop(e, "text0")} />
      <br />
      <br />
      <Tag color="blue">This text will go at the bottom!</Tag>
      <Input placeholder="Bottom Caption..." onChange={e => props.handleBot(e, "text1")} />
      <br />
      <br />
    </div>
  );
};

export default MemeInput;
