import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import React, { Component } from 'react';
import logo from "./../../memelikey.svg";
import meme from './../example_meme/pepe.jpg';
import { Row, Col, Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

class Room extends Component {
    
    subscriberProperties = {
        preferredFrameRate: 15,
        showControls: false
      };
    
    subscriberEventHandlers = {
        videoDisabled: event => {
            console.log("Subscriber video disabled!");
        },
        videoEnabled: event => {
            console.log("Subscriber video enabled!");
        }
    };

    headerStyle = {
        position: 'absolute',
        overflow: 'hidden',
        height: '64px',
        width: '100%',
        top: 0,
        left: 0,
    }
    
    menuStyle = {
        lineHeight: '64px',
    }

    contentStyle = {
        position: 'absolute',
        overflow: 'auto',
        width: '100%',
        background: '#cccccc', 
        padding: '0 50px',
        top: 64,
        bottom: 64,
    }

    breadcrumbStyle = { 
        margin: '16px 0',
    }

    boxStyle = { 
        height: '75vh', 
        background: '#fff', 
        padding: 24,
    }
    
    footerStyle = { 
        position: 'absolute',
        overflow: 'hidden',
        height: '64px',
        width: '100%',
        left: 0, 
        bottom: 0, 
        textAlign: 'center',
    }

    render() {
        return (
            <div className="App">
            <Layout className="layout" style ={{ height: "100vh" }}>
            <Header style = {this.headerStyle}>
                <Menu theme="dark" mode="horizontal" style={this.menuStyle}>
                <img src={logo} height="50" alt="MEMELIKEY LOGO"/>
                <font color='#fff'>MEMELIKEY</font>
                </Menu>
            </Header>
            <Content style={this.contentStyle}>
                <Breadcrumb style={this.breadcrumbStyle}>
                <Breadcrumb.Item>Welcome to the "Variable Name of Room" Room!</Breadcrumb.Item>
                </Breadcrumb>
                <Row type="flex" justify="space-around">
                    <Col span={14}>
                        <div style={this.boxStyle}>
                            <OTSession apiKey={process.env.REACT_APP_API_KEY} sessionId={process.env.REACT_APP_SESSION_ID} token={process.env.REACT_APP_TOKEN_ID}>
                                <OTPublisher />
                                    <OTStreams>
                                        <OTSubscriber properties={this.subscriberProperties} eventHandlers={this.subscriberEventHandlers} />
                                    </OTStreams>
                            </OTSession> 
                        </div>         
                    </Col>
                    <Col span={8}>
                        <div style={this.boxStyle}>
                            <center>Meme Template goes here!
                                <img src={meme} height="80%" width="80%" alt="meme"/>
                            </center>
                        </div>
                    </Col>
                </Row>
            </Content>
            <Footer style={this.footerStyle}>
                Reactathon Hackathon © 2018 Created by Aztec Game Lab (Possible chat area)
            </Footer>
            </Layout>
            </div>
        );
    }
}

export default Room;