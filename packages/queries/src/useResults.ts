import { useQuery } from "@tanstack/react-query";
import { getResult, getProjectMode } from "@son-q/api";

/**
 * 結果一覧取得用のカスタムフック（Suspense対応）
 */
export const useResults = (projectId: string) => {
  return useQuery({
    queryKey: ["results", projectId],
    queryFn: async () => {
      return await getResult(projectId);
    },
    enabled: !!projectId, // projectIdが存在する場合のみクエリを実行
  });
};

/**
 * プロジェクトモード取得用のカスタムフック
 */
export const useProjectMode = (projectId: string) => {
  return useQuery({
    queryKey: ["projectMode", projectId],
    queryFn: () => getProjectMode(projectId),
    enabled: !!projectId,
  });
};