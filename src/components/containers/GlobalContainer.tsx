import { GlobalContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import { isNull, pick } from "es-toolkit";
import { SnackbarProvider, useSnackbar } from "notistack";

import { User, Auth } from "@/models";
import {
  awaitOnGoogleLogin,
  awaitOnAuth,
  awaitOnPasswordLogin,
  createPasswordUser,
  signOutFirebase,
} from "@/firebase";

type Props = {
  children: React.ReactElement;
  handleDarkModeOff: Function;
  handleDarkModeOn: Function;
  darkMode: boolean;
};

const App: React.FC = (props: Props) => {
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

  const signInCheck = async () => {
    const user = await awaitOnAuth();
    if (isNull(user)) return false;
    if (!user.ok) return false;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signInGoogle = async () => {
    const user = await awaitOnGoogleLogin();
    setLoading(false);
    if (isNull(user)) return false;
    if (!user.ok) return false;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signInEmail = async (data: any) => {
    const user = await awaitOnPasswordLogin(data);
    setLoading(false);
    if (isNull(user)) return false;
    if (!user.ok) return false;
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

const GlobalContainer: React.FC = (props: Props) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <App {...props} />
    </SnackbarProvider>
  );
};

export { GlobalContainer };
