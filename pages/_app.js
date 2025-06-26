import "../styles/globals.scss";
import { GlobalContainer } from "../src/components/containers";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import { useState, useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
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

  const theme = createTheme({
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
      mode: darkMode ? "dark" : "light",
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
