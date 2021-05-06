import React from "react";

//import styles from "./Youtube.module.scss";
import YouTube from "react-youtube";
import { Button } from "@material-ui/core";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { youtube: null };
    this.updateState = this.updateState.bind(this);
  }

  onReady(event) {
    event.target.pauseVideo();
    console.log(event);
    this.setState({
      youtube: event,
    });
  }

  onStart() {
    const { youtube } = this.state;
    youtube.target.playVideo();
  }

  onStop() {
    const { youtube } = this.state;
    youtube.target.pauseVideo();
  }

  render() {
    const { id } = this.props;
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
      <>
        <YouTube videoId={id} opts={opts} onReady={this.onReady} />
        <Button onClick={this._onStart}>Start</Button>
        <Button onClick={this._onStop}>Stop</Button>
      </>
    );
  }
}

export { App as Youtube };
