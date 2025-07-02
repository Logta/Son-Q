import { authApi, projectsApi } from "@son-q/api";
import type { Project } from "@son-q/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * プロジェクト関連のReact Queryフック
 * API層を呼び出すReact固有のデータフェッチロジック
 *
 * 境界線：
 * - この層はReact Query（React依存）専用
 * - 純粋なデータ操作は /api 層に委譲
 * - UIコンポーネントはこの層のフックのみを使用
 */

/**
 * プロジェクト一覧取得用のカスタムフック（Suspense対応）
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const user = await authApi.getCurrentUser();
      return await projectsApi.getAll(user);
    },
    throwOnError: true,
  });
};

/**
 * プロジェクト作成用のカスタムフック
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Project) => {
      const user = await authApi.getCurrentUser();
      return await projectsApi.create(user, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

/**
 * プロジェクト参加用のカスタムフック
 */
export const useJoinProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, userName }: { projectId: string; userName: string }) => {
      const user = await authApi.getCurrentUser();
      return await projectsApi.join(user, projectId, userName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
