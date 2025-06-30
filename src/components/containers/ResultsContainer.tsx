import { awaitOnAuth } from "@son-q/api";
import type { Auth } from "@son-q/types";
import type React from "react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext, ResultsContext } from "@/contexts";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

/**
 * ResultsContainer: Client State専用のContainer
 * Server State（results、answers、questions、participants、questionNum、projectMode）は各コンポーネントでTanStack Queryフックを直接使用
 */
const ResultsContainer: React.FC<Props> = ({ children, projectId }) => {
  const { errorMessage, successMessage } = useContext(GlobalContext);
  const [user, setUser] = useState<Auth>();

  // 認証状態を確認してユーザー情報をセット
  useEffect(() => {
    const checkAuth = async () => {
      const authUser = await awaitOnAuth();
      if (authUser?.ok) {
        setUser(authUser);
      }
    };
    checkAuth();
  }, []);

  return (
    <ResultsContext.Provider
      value={{
        user,
        projectId,
        errorMessage,
        successMessage,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export { ResultsContainer };
