import { GlobalContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import { isNull, pick } from "es-toolkit";
import { SnackbarProvider, useSnackbar } from "notistack";

import type { User, Auth } from "@son-q/types";
import {
  awaitOnGoogleLogin,
  awaitOnAuth,
  awaitOnPasswordLogin,
  createPasswordUser,
  signOutFirebase,
} from "@son-q/api";

type Props = {
  children: React.ReactElement;
  handleDarkModeOff: () => void;
  handleDarkModeOn: () => void;
  darkMode: boolean;
};

const App: React.FC<Props> = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const successMessage = (message: string) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: "success" });
  };

  const errorMessage = (message: string) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: "error" });
  };

  const warningMessage = (message: string) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant: "warning" });
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });
  useEffect(() => {
    signInCheck();
  }, []);

  const signInCheck = async (): Promise<void> => {
    const user = await awaitOnAuth();
    if (isNull(user)) return;
    if (!user.ok) return;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signInGoogle = async (): Promise<void> => {
    const user = await awaitOnGoogleLogin();
    setLoading(false);
    if (isNull(user)) return;
    if (!user.ok) return;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signInEmail = async (data: any): Promise<void> => {
    const user = await awaitOnPasswordLogin(data);
    setLoading(false);
    if (isNull(user)) return;
    if (!user.ok) return;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signUpEmail = async (data: any) => {
    const bool = await createPasswordUser(data);
    setLoading(false);
    return bool;
  };

  const signOut = async (): Promise<string> => {
    const user: Auth = await signOutFirebase();
    user.ok &&
      setUser({
        ID: "",
        Name: "",
        Login: false,
      });
    return user.name;
  };

  return (
    <GlobalContext.Provider
      value={{
        ...pick(props, ["handleDarkModeOff", "handleDarkModeOn", "darkMode"]),
        user,
        signInCheck,
        signInGoogle,
        signInEmail,
        signUpEmail,
        signOut,
        loading,
        successMessage,
        errorMessage,
        warningMessage,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

const GlobalContainer: React.FC<Props> = (props: Props) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <App {...props} />
    </SnackbarProvider>
  );
};

export { GlobalContainer };
