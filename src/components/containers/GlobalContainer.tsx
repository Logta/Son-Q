import { SnackbarProvider, useSnackbar } from "notistack";
import type React from "react";
import { useCallback, useEffect } from "react";
import { useGlobalStore } from "@/stores";

type Props = {
  children: React.ReactElement;
  handleDarkModeOff: () => void;
  handleDarkModeOn: () => void;
  darkMode: boolean;
};

const App: React.FC<Props> = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    setNotificationFunctions,
    handleDarkModeOn,
    handleDarkModeOff,
    signInCheck,
  } = useGlobalStore();

  const successMessage = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: "success" });
  }, [enqueueSnackbar]);

  const errorMessage = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: "error" });
  }, [enqueueSnackbar]);

  const warningMessage = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: "warning" });
  }, [enqueueSnackbar]);

  // 通知関数を設定（初回のみ）
  useEffect(() => {
    setNotificationFunctions({
      successMessage,
      errorMessage,
      warningMessage,
    });
  }, [setNotificationFunctions, successMessage, errorMessage, warningMessage]);

  // ダークモード設定を反映
  useEffect(() => {
    if (props.darkMode) {
      handleDarkModeOn();
    } else {
      handleDarkModeOff();
    }
  }, [props.darkMode, handleDarkModeOn, handleDarkModeOff]);

  // 認証状態をチェック（初回のみ）
  useEffect(() => {
    signInCheck();
  }, [signInCheck]);

  return props.children;
};

const GlobalContainer: React.FC<Props> = (props: Props) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <App {...props} />
    </SnackbarProvider>
  );
};

export { GlobalContainer };
