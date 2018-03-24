//React + Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { fetchMemeTemplates, setRandomTemplate } from "../../features/meme/memeActions";

//Selectors
import { selectCurrentTemplate } from "../../features/meme/memeSelectors";

class MemeWidget extends Component {
  render() {
    const { fetchMemeTemplates, setRandomTemplate, currentTemplate } = this.props;
    return (
      <div>
        Meme Widge Mini Game Here
        <button onClick={fetchMemeTemplates}>get memes</button>
        <button onClick={setRandomTemplate}> select random </button>
        {currentTemplate ? <div>{currentTemplate.name}</div> : <div>non selected atm</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentTemplate: selectCurrentTemplate(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMemeTemplates,
      setRandomTemplate
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MemeWidget);
