import { GlobalContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { User, Auth } from "@/models";
import {
  awaitOnGoogleLogin,
  awaitOnAuth,
  awaitOnPasswordLogin,
  createPasswordUser,
  signOutFirebase,
} from "@/firebase";

const GlobalContainer: React.FC = ({ children }) => {
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
    if (_.isNull(user)) return;
    if (!user.ok) return;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signInGoogle = async () => {
    const user = await awaitOnGoogleLogin();
    setLoading(false);
    if (_.isNull(user)) return;
    if (!user.ok) return;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
  };

  const signInEmail = async (data: any) => {
    const user = await awaitOnPasswordLogin(data);
    setLoading(false);
    if (_.isNull(user)) return;
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
        user,
        signInCheck,
        signInGoogle,
        signInEmail,
        signUpEmail,
        signOut,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContainer };
