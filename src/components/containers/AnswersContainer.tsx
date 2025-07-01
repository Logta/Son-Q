import type React from "react";
import { useEffect } from "react";
import { useAnswersStore, useGlobalStore } from "@/stores";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

/**
 * AnswersContainer: Client State専用のContainer
 * Server State（answers、questions、participants、questionNum）は各コンポーネントでTanStack Queryフックを直接使用
 */
const AnswersContainer: React.FC<Props> = ({ children, projectId }) => {
  const checkAuth = useGlobalStore((state) => state.checkAuth);
  const { setProjectId } = useAnswersStore();

  // 認証状態を確認
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // projectIdをストアに設定
  useEffect(() => {
    setProjectId(projectId);
  }, [projectId, setProjectId]);

  return <>{children}</>;
};

export { AnswersContainer };
