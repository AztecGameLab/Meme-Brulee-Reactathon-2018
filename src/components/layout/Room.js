//React
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Actions
import { aggregateEmotions, processImage, addPlayer, removePlayer, recieveReactions } from "../../features/users/UsersActions";
import { playGame, receivedMemes, playAgain } from "../../features/meme/memeActions";
import { storeSession } from "../../features/session/sessionActions";
import { selectReceivedMemes } from "../../features/meme/memeSelectors";

//Selectors
import MemeImage from "./../memegame/MemeImage.js";
import { selectMyEmotions } from "../../features/users/UserSelectors";

//Logo
import logo from "../../../src/memelikey.svg";
import netlify from "../../../src/netlify.png";
import tokbox from "../../../src/tokbox.png";

//Components
import MemeWidget from "../memegame/MemeWidget";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import { Breadcrumb, Col, Layout, Menu, Row } from "antd";
import PresentMeme from "../memegame/PresentMeme";

const OpenTok = require("opentok");
const { Header, Content, Footer } = Layout;

class Room extends Component {
  constructor(props) {
    super(props);
    let token = null;
    let ot = new OpenTok(process.env.REACT_APP_API_KEY, process.env.REACT_APP_API_SECRET);
    let tokenOptions = {};
    tokenOptions.data = JSON.stringify({ name: this.publisherProperties.name });
    token = ot.generateToken(process.env.REACT_APP_SESSION_ID, tokenOptions);
    this.state = {
      players: {},
      token: token,
      id: ""
    };
  }

  componentDidMount() {
    const that = this;
    //Session Connection Listeners
    this.props.storeSession(this.sessionRef.sessionHelper.session);
    this.sessionRef.sessionHelper.session.on("connectionCreated", event => {
      console.log(event.connection);
      const data = JSON.parse(event.connection.data);
      console.log("Connection data: ", data);
      //publisher
      if (data.name === this.publisherProperties.name) {
        that.setState({
          id: event.connection.connectionId
        });
      }
      const { addPlayer } = that.props;
      const player = {
        [event.connection.connectionId]: {
          name: data.name
        }
      };
      addPlayer(player);
    });
    this.sessionRef.sessionHelper.session.on("connectionDestroyed", event => {
      that.props.removePlayer(event.connection.connectionId);
    });
    this.sessionRef.sessionHelper.session.on("signal:meme", event => {
      const { players } = that.state;
      if (!players[event.from.id]) {
        const data = {
          id: event.from.id,
          url: JSON.parse(event.data).url
        };
        that.props.receivedMemes(data);
        players[event.from.id] = true;
        that.setState({ players });
      }
    });
    this.sessionRef.sessionHelper.session.on("signal:playGame", event => {
      that.props.playGame();
    });
    this.reactionListener();
  }

  reactionListener = () => {
    const that = this;
    const { recieveReactions, aggregateEmotions } = that.props;
    this.sessionRef.sessionHelper.session.on("signal:msg", event => {
      const subscriberData = JSON.parse(event.data);
      let reactionData = {};
      reactionData.id = subscriberData.playerId;
      reactionData.faceData = subscriberData.faceData;
      recieveReactions(reactionData);
      aggregateEmotions();
    });
  };

  sendMyEmotions = () => {
    const that = this;
    const { currentEmotions } = that.props;
    const { session } = that.sessionRef.sessionHelper;
    return session.signal(
      {
        type: "msg",
        data: JSON.stringify({
          playerId: that.state.id,
          faceData: currentEmotions
        })
      },
      error => {
        if (error) {
          console.error("Error sending signal:" + error.name, error.message);
        }
      }
    );
  };

  playGame = () => {
    this.props.playGame();
  };

  getMyEmotions = () => {
    const { processImage } = this.props;
    const b64Data = this.publisherRef.getPublisher().getImgData();
    const returnOptions = {
      returnFaceId: "true",
      returnFaceLandmarks: "false",
      returnFaceAttributes: "emotion"
    };
    const params = Object.assign({}, { b64Data }, returnOptions);
    return processImage(params);
  };

  CustomPublisher = props => {
    return (
      <div>
        <OTPublisher
          session={props.session}
          properties={this.publisherProperties}
          ref={instance => {
            this.publisherRef = instance;
          }}
        />
        {this.publisherProperties.name}
      </div>
    );
  };

  CustomSubscriber = props => {
    return (
      <div>
        <OTSubscriber key={props.stream.id} session={props.session} stream={props.stream} properties={this.subscriberProperties} eventHandlers={this.subscriberEventHandlers} />
        {props.stream.name}
      </div>
    );
  };

  publisherProperties = {
    name: this.props.publisherName
  };

  subscriberProperties = {
    preferredFrameRate: 15,
    showControls: true
  };

  subscriberEventHandlers = {
    videoDisabled: event => {},
    videoEnabled: event => {}
  };

  render() {
    const { memesToPresent, playAgain } = this.props;
    return (
      <div className="App">
        <Layout className="layout" style={{ height: "100vh" }}>
          <Header style={this.headerStyle}>
            <Menu theme="dark" mode="horizontal" style={this.menuStyle} selectedKeys={["home"]}>
              <Menu.Item key="home">
                <img src={logo} height="70" width="70" alt="logo" />mème brûlée
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={contentStyle}>
            <Breadcrumb style={breadcrumbStyle}>
              <Breadcrumb.Item>Welcome to our kitchen! We hope you enjoy your stay! :)</Breadcrumb.Item>
            </Breadcrumb>
            <Row type="flex" justify="space-around">
              <Col span={5}>
                <div style={boxStyle}>
                  <OTSession
                    ref={instance => {
                      this.sessionRef = instance;
                    }}
                    apiKey={process.env.REACT_APP_API_KEY}
                    sessionId={process.env.REACT_APP_SESSION_ID}
                    token={this.state.token}
                  >
                    <this.CustomPublisher />
                    <OTStreams>
                      <this.CustomSubscriber />
                    </OTStreams>
                  </OTSession>
                </div>
              </Col>
              <Col span={13}>
                <div style={boxStyle}>
                  <center>
                    {this.props.memesToPresent.length > 0 ? (
                      <PresentMeme memesToPresent={memesToPresent} playAgain={playAgain} getMyEmotions={this.getMyEmotions} sendMyEmotions={this.sendMyEmotions} />
                    ) : (
                      <MemeImage />
                    )}
                  </center>
                </div>
              </Col>
              <Col span={5}>
                <div style={boxStyle}>
                  <center>
                    <MemeWidget sessionRef={this.props.session} playAgain={playAgain} getMyEmotions={this.getMyEmotions} sendMyEmotions={this.sendMyEmotions} />
                  </center>
                </div>
              </Col>
            </Row>
          </Content>
          <Footer style={footerStyle}>
            Cooked by <a href="https://github.com/AztecGameLab"> SDSU Aztec Game Lab </a>| Baked{" "}
            <a href="https://www.netlify.com/">
              {" "}
              with <img src={netlify} height="20" width="20" alt="Nelify" />
            </a>{" "}
            | Coming at ya live{" "}
            <a href="https://tokbox.com/">
              {" "}
              with <img src={tokbox} height="20" width="20" alt="Nelify" />{" "}
            </a>| <a href="https://www.reactathon.com/">Reactathon 2018 © </a>
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.sessionState,
    memesToPresent: selectReceivedMemes(state),
    currentEmotions: selectMyEmotions(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      processImage,
      addPlayer,
      removePlayer,
      recieveReactions,
      playGame,
      storeSession,
      receivedMemes,
      playAgain,
      aggregateEmotions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Room);

//Inline Styles
const contentStyle = {
  position: "absolute",
  width: "100%",
  background: "#cccccc",
  padding: "0 50px",
  top: 64,
  bottom: 64
};

const breadcrumbStyle = {
  textAlign: "center",
  margin: "16px 0"
};

const boxStyle = {
  height: "75vh",
  width: "100%",
  background: "#fff",
  padding: 24
};

const footerStyle = {
  position: "absolute",
  overflow: "hidden",
  height: "64px",
  width: "100%",
  left: 0,
  bottom: 0,
  textAlign: "center"
};
