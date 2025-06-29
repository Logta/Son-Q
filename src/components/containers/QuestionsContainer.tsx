import { QuestionsContext, GlobalContext } from "@/contexts";
import { useState, useContext, useEffect } from "react";
import { isNull } from "es-toolkit";

import { Auth } from "@/models";
import { awaitOnAuth } from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

/**
 * QuestionsContainer: Client State専用のContainer
 * Server State（questions、participants、questionNum）は各コンポーネントでTanStack Queryフックを直接使用
 */
const QuestionsContainer: React.FC<Props> = ({ children, projectId }) => {
  const { errorMessage, successMessage } = useContext(GlobalContext);
  
  const [user, setUser] = useState<Auth>();

  // 認証状態を確認してユーザー情報をセット
  useEffect(() => {
    const checkAuth = async () => {
      const authUser = await awaitOnAuth();
      if (authUser && authUser.ok) {
        setUser(authUser);
      }
    };
    checkAuth();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        user,
        projectId,
        errorMessage,
        successMessage,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsContainer };
