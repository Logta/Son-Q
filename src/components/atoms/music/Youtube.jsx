import React, { useState } from "react";
import styles from "./Youtube.module.scss";

//import styles from "./Youtube.module.scss";
import YouTube from "react-youtube";
import { Box, Button, ButtonGroup, Grid, Slider } from "@mui/material";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

const App = (props) => {
  const [youtube, setYoutube] = useState();
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0);

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
    event.target.unMute();
    setYoutube(event.target);
    setVolume(event.target.getVolume());
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

  const handleChangeVolume = (_, newValue) => {
    setVolume(newValue);
    youtube.setVolume(newValue);
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
      {youtube && (
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDown />
          </Grid>
          <Grid item xs>
            <Slider
              value={volume}
              onChange={handleChangeVolume}
              aria-labelledby="continuous-slider"
            />
          </Grid>
          <Grid item>
            <VolumeUp />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export { App as Youtube };
