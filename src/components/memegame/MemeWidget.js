//React + Redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Components
import MemeInput from "./MemeInput";
import MemeStart from "./MemeStart";
import PresentMeme from "./PresentMeme";

//Actions
import { submitMeme, playGame, GM_PHASES, playAgain } from "../../features/meme/memeActions";
import { selectCompletedMemes, selectCookingStatus } from "../../features/meme/memeSelectors";

//Selectors
<<<<<<< HEAD
import { selectCurrentTemplate } from "../../features/meme/memeSelectors";
=======
import { selectCurrentTemplate, selectMemeWasSent, selectCurrentPhase } from "../../features/meme/memeSelectors";
>>>>>>> dev

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
    const that = this;
    const { currentTemplate, submitMeme } = this.props;
    const captionObj = this.state;
    const memeParams = Object.assign({}, { template_id: currentTemplate.id }, captionObj);
    submitMeme(memeParams).then(() => {
      that.props.session.signal(
        {
          type: "meme",
          data: that.props.completedMemes
        },
        error => {
          if (error) {
            console.error("Error sending signal:" + error.name, error.message);
          }
        }
      );
    });
  };

  handlePlayGame = () => {
    const { playGame, session } = this.props;
    if (session.signal) {
      session.signal({ type: "playGame" });
    }
    playGame();
  };

  render() {
<<<<<<< HEAD
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
=======
    const { currentTemplate, cookingStatus, memeWasSent, playGame, currentPhase, playAgain } = this.props;
    let currComponent = <div>?</div>;
    if (cookingStatus === "finished" && !memeWasSent) {
      this.handleSubmitMeme();
    }
    switch (currentPhase) {
      case GM_PHASES[0]:
        currComponent = <MemeStart playGame={this.handlePlayGame} />;
        break;
      case GM_PHASES[1]:
        currComponent = <MemeInput currentTemplate={currentTemplate} handleTop={e => this.handleCaptionInput(e, "text0")} handleBot={e => this.handleCaptionInput(e, "text1")} />;
        break;
      case GM_PHASES[2]:
        currComponent = <PresentMeme playAgain={playAgain} />;
        break;
      default:
        currComponent = <div>Loading...</div>;
        break;
    }
    return <div>{currComponent}</div>;
>>>>>>> dev
  }
}

const mapStateToProps = state => {
  return {
    session: state.sessionState,
    currentTemplate: selectCurrentTemplate(state),
    completedMemes: selectCompletedMemes(state),
    cookingStatus: selectCookingStatus(state),
    memeWasSent: selectMemeWasSent(state),
    currentPhase: selectCurrentPhase(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitMeme,
      playGame,
      playAgain
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MemeWidget);
