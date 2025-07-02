import type React from "react";
import { useEffect } from "react";
import { useGlobalStore, useResultsStore } from "@/stores";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

/**
 * ResultsContainer: Client State専用のContainer
 * Server State（results、answers、questions、participants、questionNum、projectMode）は各コンポーネントでTanStack Queryフックを直接使用
 */
const ResultsContainer: React.FC<Props> = ({ children, projectId }) => {
  const checkAuth = useGlobalStore((state) => state.checkAuth);
  const { setProjectId } = useResultsStore();

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

export { ResultsContainer };
