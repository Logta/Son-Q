import "../styles/globals.scss";
import { GlobalContainer } from "../src/components/containers";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import CssBaseline from "@mui/material/CssBaseline";

/**
 * QueryClientの設定（Suspense対応）
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分間はキャッシュを使用
      gcTime: 10 * 60 * 1000, // 10分間メモリに保持
      retry: 3, // 失敗時に3回リトライ
      refetchOnWindowFocus: false, // ウィンドウフォーカス時の自動再取得を無効
      suspense: true, // Suspenseモードを有効化
    },
    mutations: {
      retry: 3, // ミューテーションも3回リトライ
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
