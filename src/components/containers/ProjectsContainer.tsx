import React, { useContext, useState } from "react";
import { GlobalContext, ProjectsContext } from "@/contexts";

type Props = {
  children: React.ReactNode;
};

import { awaitOnAuth } from "@son-q/api";
import type { User } from "@son-q/types";

const ProjectsContainer: React.FC<Props> = ({ children }) => {
  const { errorMessage, successMessage, warningMessage } = useContext(GlobalContext);

  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });

  // 認証状態を確認してユーザー情報をセット
  React.useEffect(() => {
    const checkAuth = async () => {
      const authUser = await awaitOnAuth();
      if (authUser?.ok) {
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
