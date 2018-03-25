import React, { Component } from "react";
import { connect } from "react-redux";
import Image from 'react-image-resizer';

//Selectors
import { selectCompletedMemes } from "../../features/meme/memeSelectors";

class MemeImage extends Component {
  render() {
    return <div style={{imageStyle}}>{this.props.completedMemes[this.props.completedMemes.length-1] && 
    <Image src={this.props.completedMemes[this.props.completedMemes.length-1].url} width={"800"} height={"600"}/>}</div>;
  }
}

const mapStateToProps = state => {
  return {
    completedMemes: selectCompletedMemes(state)
  };
};

export default connect(mapStateToProps, null)(MemeImage);

//Inline Styles
const imageStyle = {
  justifyContent: 'center', 
  alignItems: 'center', 
  position: 'absolute',
};
