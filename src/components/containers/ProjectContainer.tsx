import type React from "react";
import { Suspense, useEffect } from "react";
import { useGlobalStore, useProjectStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getProjectFromID } from "@son-q/api";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

/**
 * ProjectContainer: Client State専用のContainer
 * Server State（projectデータ）はTanStack Queryで管理
 */
const ProjectContainerContent: React.FC<Props> = ({ children, projectId }) => {
  const { user, checkAuth, errorMessage, successMessage } = useGlobalStore();
  const { setNotificationFunctions } = useProjectStore();

  // 通知関数をストアに設定（初回のみ）
  useEffect(() => {
    setNotificationFunctions({ errorMessage, successMessage, warningMessage: () => { /* プレースホルダー */ } });
  }, [setNotificationFunctions, errorMessage, successMessage]);

  // 認証状態を確認
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // TanStack Queryでプロジェクトデータを取得
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectFromID(projectId),
    enabled: !!user && !!projectId,
  });

  if (!project || !user) return null;

  return <>{children}</>;
};

const ProjectContainer: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <ProjectContainerContent {...props} />
    </Suspense>
  );
};

export { ProjectContainer };
