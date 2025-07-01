import React, { useEffect } from "react";
import { useGlobalStore, useProjectsStore } from "@/stores";
import { awaitOnAuth } from "@son-q/api";
import type { User } from "@son-q/types";

type Props = {
  children: React.ReactNode;
};

const ProjectsContainer: React.FC<Props> = ({ children }) => {
  const { errorMessage, successMessage, warningMessage } = useGlobalStore();
  const { setUser, setNotificationFunctions } = useProjectsStore();

  // 通知関数を設定（初回のみ）
  useEffect(() => {
    setNotificationFunctions({
      errorMessage,
      successMessage,
      warningMessage,
    });
  }, []);

  // 認証状態を確認してユーザー情報をセット
  useEffect(() => {
    const checkAuth = async () => {
      const authUser = await awaitOnAuth();
      if (authUser?.ok) {
        setUser({
          ID: authUser.id,
          Name: authUser.name,
          Login: true,
        });
      } else {
        setUser(null);
      }
    };
    checkAuth();
  }, [setUser]);

  return <>{children}</>;
};

export { ProjectsContainer };
