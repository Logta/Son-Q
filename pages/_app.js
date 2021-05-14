import "../styles/globals.scss";
import { GlobalContainer } from "../src/components/containers";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import { useState, useEffect } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeOn = () => {
    window.localStorage.setItem("darkMode", "on");
    setDarkMode(true);
  };

  const handleDarkModeOff = () => {
    window.localStorage.setItem("darkMode", "off");
    setDarkMode(false);
  };

  useEffect(() => {
    if (window.localStorage.getItem("darkMode") === "on") {
      setDarkMode(true);
    } else if (window.localStorage.getItem("darkMode") === "off") {
      setDarkMode(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Noto Sans JP",
        "Lato",
        "游ゴシック Medium",
        "游ゴシック体",
        "Yu Gothic Medium",
        "YuGothic",
        "ヒラギノ角ゴ ProN",
        "Hiragino Kaku Gothic ProN",
        "メイリオ",
        "Meiryo",
        "ＭＳ Ｐゴシック",
        "MS PGothic",
        "sans-serif",
      ].join(","),
    },
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalContainer
        darkMode={darkMode}
        handleDarkModeOn={handleDarkModeOn}
        handleDarkModeOff={handleDarkModeOff}
      >
        <CssBaseline />
        <Component {...pageProps} />
      </GlobalContainer>
    </ThemeProvider>
  );
}

export default MyApp;
