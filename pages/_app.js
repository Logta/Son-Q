import "../app.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { GlobalContainer } from "../src/components/containers";

/**
 * QueryClientの設定（Suspense対応）
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // キャッシュを常に古いと見なしてより頻繁に再取得
      gcTime: 5 * 60 * 1000, // 5分間メモリに保持
      retry: 3, // 失敗時に3回リトライ
      refetchOnWindowFocus: true, // ウィンドウフォーカス時の自動再取得を有効
      refetchOnMount: true, // マウント時に再取得
      suspense: true, // Suspenseを有効化
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

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContainer
        darkMode={darkMode}
        handleDarkModeOn={handleDarkModeOn}
        handleDarkModeOff={handleDarkModeOff}
      >
        <Component {...pageProps} />
      </GlobalContainer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
