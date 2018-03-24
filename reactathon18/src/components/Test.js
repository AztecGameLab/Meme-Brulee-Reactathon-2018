import React from "react";

const Test = () => {
  return <div>seceret{process.env.REACT_APP_TOK_SECRET}</div>;
};

export default Test;
