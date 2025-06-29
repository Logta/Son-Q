import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProject, createProject, updateProject, deleteProject, joinProject } from "../firebase/projects";
import { awaitOnAuth } from "../firebase/auth";
import type { Project } from "../models/Project";

/**
 * プロジェクト一覧取得用のカスタムフック（Suspense対応）
 */
export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await getProject(user);
    },
    throwOnError: true, // Suspenseでエラーをキャッチできるようにする
  });
};

/**
 * プロジェクト作成用のカスタムフック
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Project) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await createProject(user, data);
    },
    onSuccess: () => {
      // プロジェクト一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

/**
 * プロジェクト更新用のカスタムフック
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ index, data }: { index: string; data: Project }) => {
      return await updateProject(index, data);
    },
    onSuccess: () => {
      // プロジェクト一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

/**
 * プロジェクト削除用のカスタムフック
 */
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (index: string) => {
      return await deleteProject(index);
    },
    onSuccess: () => {
      // プロジェクト一覧を無効化して再取得
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
    mutationFn: async (index: string) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await joinProject(user, index);
    },
    onSuccess: () => {
      // プロジェクト一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};