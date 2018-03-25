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
import { selectCurrentTemplate, selectMemeWasSent, selectCurrentPhase } from "../../features/meme/memeSelectors";

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
      session.signal("playGame");
    }
    playGame();
  };

  render() {
    const { currentTemplate, cookingStatus, memeWasSent, currentPhase, playAgain, getMyEmotions, sendMyEmotions } = this.props;
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
        currComponent = <PresentMeme playAgain={playAgain} getMyEmotions={getMyEmotions} sendMyEmotions={sendMyEmotions} />;
        break;
      default:
        currComponent = <div>Loading...</div>;
        break;
    }
    return <div>{currComponent}</div>;
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
