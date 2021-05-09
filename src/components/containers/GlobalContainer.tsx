import { GlobalContext } from "@/contexts";
import React, { useState } from "react";
import _ from "lodash";

import { User } from "@/models";
import {
  awaitOnGoogleLogin,
  awaitOnPasswordLogin,
  createPasswordUser,
} from "@/firebase";

const GlobalContainer: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });

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

  const signOut = async () => {
    setUser({
      ID: "",
      Name: "",
      Login: false,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
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
