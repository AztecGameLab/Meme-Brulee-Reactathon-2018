import React, { Component } from "react";
import { connect } from "react-redux";

//Selectors
import { selectCompletedMemes } from "../../features/meme/memeSelectors";

class MemeImage extends Component {
  render() {
    return <div>{this.props.completedMemes[0] && <img src={this.props.completedMemes[0].url} />}</div>;
  }
}

const mapStateToProps = state => {
  return {
    completedMemes: selectCompletedMemes(state)
  };
};

export default connect(mapStateToProps, null)(MemeImage);
