import React, { useState, useContext } from "react";
import { GlobalContext } from "@/contexts";
import styles from "./Youtube.module.scss";

//import styles from "./Youtube.module.scss";
import YouTube from "react-youtube";
import { IconButton, Box, Button, ButtonGroup } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

const App = (props) => {
  const [youtube, setYoutube] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const { darkMode } = useContext(GlobalContext);

  const { id } = props;
  const opts = {
    height: "1",
    width: "1",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
    event.target.unMute();
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

  const handleChangeVolume = (_, newValue) => {
    setVolume(newValue);
    youtube.setVolume(newValue);
  };

  return (
    <>
      <Box m={-3} />
      <YouTube videoId={id} opts={opts} onReady={onReady} />
      {!playing ? (
        <IconButton
          aria-label="play"
          className={styles.margin}
          onClick={onStart}
          disabled={loading}
        >
          <PlayCircleOutlineIcon
            fontSize="small"
            className={!darkMode && styles.light}
          />
        </IconButton>
      ) : (
        <IconButton
          aria-label="stop"
          className={styles.margin}
          onClick={onStop}
          disabled={loading}
        >
          <StopIcon fontSize="small" className={!darkMode && styles.light} />
        </IconButton>
      )}
      {youtube && (
        <ButtonGroup>
          <Button
            aria-label="foward"
            className={styles.margin}
            onClick={() => {
              const vol = youtube.getVolume();
              youtube.setVolume(vol - 10);
            }}
            disabled={loading}
          >
            <VolumeDown fontSize="small" />
          </Button>
          <Button
            aria-label="foward"
            className={styles.margin}
            onClick={() => {
              const vol = youtube.getVolume();
              youtube.setVolume(vol + 10);
            }}
            disabled={loading}
          >
            <VolumeUp fontSize="small" />
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export { App as YoutubeAnswer };
