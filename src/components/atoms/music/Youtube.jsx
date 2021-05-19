import React, { useState, useContext } from "react";
import { GlobalContext } from "@/contexts";
import styles from "./Youtube.module.scss";
import clsx from "clsx";

//import styles from "./Youtube.module.scss";
import YouTube from "react-youtube";
import { Box, Button, ButtonGroup } from "@material-ui/core";
import Forward10Icon from "@material-ui/icons/Forward10";
import Replay10Icon from "@material-ui/icons/Replay10";
import StopIcon from "@material-ui/icons/Stop";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const App = (props) => {
  const [youtube, setYoutube] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const { darkMode } = useContext(GlobalContext);

  const { id, endSec = 15 } = props;
  const opts = {
    height: "1",
    width: "1",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      end: endSec,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
    setYoutube(event.target);
    setLoading(false);
  };

  const onStart = () => {
    youtube.playVideo();
    setPlaying(true);
  };

  const onStop = () => {
    youtube.stopVideo();
    setPlaying(false);
  };

  const onBefore10Sec = () => {
    var currentTime = youtube.getCurrentTime();

    youtube.seekTo(currentTime - 10);
  };

  const onFoward10Sec = () => {
    var currentTime = youtube.getCurrentTime();
    youtube.seekTo(currentTime + 10);
  };

  return (
    <>
      <Box m={-3} />
      <YouTube videoId={id} opts={opts} onReady={onReady} />
      <ButtonGroup
        size="small"
        variant={"contained"}
        color="primary"
        aria-label="contained primary button group"
      >
        <Button onClick={onBefore10Sec} disabled={loading}>
          <Replay10Icon fontSize="small" />
        </Button>
        {!playing ? (
          <Button aria-label="play" onClick={onStart} disabled={loading}>
            <PlayCircleOutlineIcon fontSize="small" />
          </Button>
        ) : (
          <Button aria-label="stop" onClick={onStop} disabled={loading}>
            <StopIcon fontSize="small" />
          </Button>
        )}
        <Button
          aria-label="foward"
          className={styles.margin}
          onClick={onFoward10Sec}
          disabled={loading}
        >
          <Forward10Icon fontSize="small" />
        </Button>
      </ButtonGroup>
    </>
  );
};

export { App as Youtube };
