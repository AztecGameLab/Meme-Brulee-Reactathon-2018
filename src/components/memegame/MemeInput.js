import React from "react";

//Components
import { Input, Tag } from "antd";
import please from "../../../src/please.gif";

const MemeInput = props => {
  return (
    <div>
      <h1>Delight us with your meme craft!</h1>
      <br />
      <br />
      <Tag color="blue">This text will go at the first possible location!</Tag>
      <Input placeholder="Enter First Caption..." onChange={e => props.handleTop(e, "text0")} />
      <br />
      <br />
      <Tag color="blue">This text will go at the second possible location!</Tag>
      <Input placeholder="Enter Second Caption..." onChange={e => props.handleBot(e, "text1")} />
      <br />
      <br />
      <p>Your meme dessert will be served in 20 seconds! Make sure to fill out the captions!</p>
      <p>Some memes don't need two captions. All dishes are unique in their own way. :)</p>
      <img src={please} height="300" alt="Donut wait! Your time is now!" />
    </div>
  );
};

export default MemeInput;
