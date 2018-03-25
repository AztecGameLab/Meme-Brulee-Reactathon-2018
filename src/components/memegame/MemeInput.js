import React from "react";

//Components
import { Input } from "antd";

const MemeInput = props => {
  return (
    <div>
      {props.currentTemplate.name}
      <Input placeholder="Top Caption..." onChange={e => props.handleTop(e, "text0")} />
      <br />
      <br />
      <Input placeholder="Bottom Caption..." onChange={e => props.handleBot(e, "text1")} />
      <br />
      <br />
    </div>
  );
};

export default MemeInput;
