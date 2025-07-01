import { useEffect } from "react";
import { useGlobalStore, useQuestionsStore } from "@/stores";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

/**
 * QuestionsContainer: Client State専用のContainer
 * Server State（questions、participants、questionNum）は各コンポーネントでTanStack Queryフックを直接使用
 */
const QuestionsContainer: React.FC<Props> = ({ children, projectId }) => {
  const checkAuth = useGlobalStore((state) => state.checkAuth);
  const { setProjectId } = useQuestionsStore();

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

export { QuestionsContainer };
