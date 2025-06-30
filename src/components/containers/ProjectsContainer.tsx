import { ProjectsContext, GlobalContext } from "@/contexts";
import React, { useState, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

import type { User } from "@son-q/types";
import { awaitOnAuth } from "@son-q/api";

const ProjectsContainer: React.FC<Props> = ({ children }) => {
  const { errorMessage, successMessage, warningMessage } =
    useContext(GlobalContext);
  
  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });

  // 認証状態を確認してユーザー情報をセット
  React.useEffect(() => {
    const checkAuth = async () => {
      const authUser = await awaitOnAuth();
      if (authUser && authUser.ok) {
        setUser({
          ID: authUser.id,
          Name: authUser.name,
          Login: true,
        });
      }
    };
    checkAuth();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        user,
        errorMessage,
        successMessage,
        warningMessage,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContainer };
