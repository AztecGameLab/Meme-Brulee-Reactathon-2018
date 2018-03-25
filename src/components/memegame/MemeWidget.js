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
        <Button type="primary" icon="poweroff" onClick={fetchMemeTemplates}>Obtain a set of memes!</Button>
        <br/><br/>
        <Button type="primary" icon="search" onClick={setRandomTemplate}>Select a random meme!</Button>
        <br/><br/>
        {currentTemplate ? <div>{currentTemplate.name}</div> : 
        <div>Press <text style={{color: '#1890ff'}}>"Obtain a set of memes!"</text>
        <br/>then <text style={{color: '#1890ff'}}>"Select a random meme!"</text>
        <br/>Your prompt will appear here!
        </div>}
        <br/>
        <Input placeholder="Top Caption..." onChange={e => this.handleCaptionInput(e, "text0")} />
        <br/><br/>
        <Input placeholder="Bottom Caption..." onChange={e => this.handleCaptionInput(e, "text1")} />
        <br/><br/>
        <Button onClick={this.handleSubmitMeme}>Submit your meme!</Button>
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
