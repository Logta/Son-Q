import { GlobalContext } from "@/contexts";
import React, { useState } from "react";
import _ from "lodash";

import { User } from "@/models";
import { awaitOnLogin } from "@/firebase";

const GlobalContainer: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });

  const signIn = async () => {
    const user = await awaitOnLogin();
    setLoading(false);
    if (_.isNull(user)) return;
    if (!user.ok) return;
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
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
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContainer };
