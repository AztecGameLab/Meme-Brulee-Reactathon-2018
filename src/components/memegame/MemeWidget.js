//React + Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import { Button, Input } from "antd";

//Actions
import { fetchMemeTemplates, setRandomTemplate, submitMeme } from "../../features/meme/memeActions";

//Selectors
import { selectCurrentTemplate } from "../../features/meme/memeSelectors";

class MemeWidget extends Component {
  state = {
    text0: "",
    text1: ""
  };

  handleCaptionInput = (e, caption) => {
    this.setState({
      [caption]: e.target.value
    });
  };

  handleSubmitMeme = () => {
    const { currentTemplate, submitMeme } = this.props;
    const captionObj = this.state;
    const memeParams = Object.assign({}, { template_id: currentTemplate.id }, captionObj);
    debugger;
    submitMeme(memeParams);
  };

  render() {
    const { fetchMemeTemplates, setRandomTemplate, currentTemplate } = this.props;
    return (
      <div>
        Meme Widge Mini Game Here
        <Button onClick={fetchMemeTemplates}>get memes</Button>
        <Button onClick={setRandomTemplate}> select random </Button>
        {currentTemplate ? <div>{currentTemplate.name}</div> : <div>non selected atm</div>}
        <Input placeholder="Top Caption..." onChange={e => this.handleCaptionInput(e, "text0")} />
        <Input placeholder="Bottom Caption..." onChange={e => this.handleCaptionInput(e, "text1")} />
        <div>{this.state.topCaption}</div>
        <div>{this.state.bottomCaption}</div>
        <Button onClick={this.handleSubmitMeme}>Submit Meme</Button>
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
      setRandomTemplate,
      submitMeme
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MemeWidget);
