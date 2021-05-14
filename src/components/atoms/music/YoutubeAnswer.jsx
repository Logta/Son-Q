import React, { useState, useContext } from "react";
import { GlobalContext } from "@/contexts";
import styles from "./Youtube.module.scss";

//import styles from "./Youtube.module.scss";
import YouTube from "react-youtube";
import { IconButton, Box } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

const App = (props) => {
  const [youtube, setYoutube] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
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
    </>
  );
};

export { App as YoutubeAnswer };
