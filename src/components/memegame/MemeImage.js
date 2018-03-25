import React, { Component } from "react";
import { connect } from "react-redux";

//Selectors
import { selectCompletedMemes } from "../../features/meme/memeSelectors";

class MemeImage extends Component {
  render() {
    return <div>{this.props.completedMemes[this.props.completedMemes.length-1] && <img src={this.props.completedMemes[this.props.completedMemes.length-1].url}/>}</div>;
  }
}

const mapStateToProps = state => {
  return {
    completedMemes: selectCompletedMemes(state)
  };
};

export default connect(mapStateToProps, null)(MemeImage);
