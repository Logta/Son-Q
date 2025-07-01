import { deleteProject, getProjectFromID, updateProject } from "@son-q/api";
import type { Project, User } from "@son-q/types";
import { notImplemented } from "packages/utils/lib";
import { create } from "zustand";

type NotificationFunction = (message: string) => void;

type ProjectState = {
  /** プロジェクトデータ */
  project: Project | null;
  /** ユーザー情報 */
  user: User | null;
  /** ローディング状態 */
  loading: boolean;
  /** エラー通知関数 */
  errorMessage: NotificationFunction;
  /** 警告通知関数 */
  warningMessage: NotificationFunction;
  /** 成功通知関数 */
  successMessage: NotificationFunction;
  /** プロジェクトを設定 */
  setProject: (project: Project | null) => void;
  /** ユーザー情報を設定 */
  setUser: (user: User | null) => void;
  /** ローディング状態を設定 */
  setLoading: (loading: boolean) => void;
  /** 通知関数を設定 */
  setNotificationFunctions: (functions: {
    errorMessage: NotificationFunction;
    warningMessage: NotificationFunction;
    successMessage: NotificationFunction;
  }) => void;
  /** プロジェクトを取得 */
  getProject: (projectId: string) => Promise<Project | null>;
  /** プロジェクト情報を更新 */
  updateProjectInfo: (project: Project) => Promise<void>;
  /** プロジェクトを削除 */
  deleteProjectFromID: (projectId: string) => Promise<void>;
};

/**
 * 個別プロジェクトページ用状態管理ストア
 */
export const useProjectStore = create<ProjectState>((set, get) => ({
  project: null,
  user: null,
  loading: true,
  errorMessage: notImplemented,
  warningMessage: notImplemented,
  successMessage: notImplemented,

  setProject: (project) => set({ project }),

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),

  setNotificationFunctions: (functions) => set(functions),

  getProject: async (projectId: string) => {
    const { errorMessage } = get();
    try {
      const project = await getProjectFromID(projectId);
      set({ project, loading: false });
      return project;
    } catch (error) {
      console.error("プロジェクト取得エラー:", error);
      errorMessage("プロジェクトの取得に失敗しました");
      set({ loading: false });
      return null;
    }
  },

  updateProjectInfo: async (project: Project) => {
    const { successMessage, errorMessage } = get();
    try {
      await updateProject(project.ID, project);
      set({ project });
      successMessage("プロジェクト情報を更新しました");
    } catch (error) {
      console.error("プロジェクト更新エラー:", error);
      errorMessage("プロジェクトの更新に失敗しました");
      throw error;
    }
  },

  deleteProjectFromID: async (projectId: string) => {
    const { successMessage, errorMessage } = get();
    try {
      await deleteProject(projectId);
      set({ project: null });
      successMessage("プロジェクトを削除しました");
    } catch (error) {
      console.error("プロジェクト削除エラー:", error);
      errorMessage("プロジェクトの削除に失敗しました");
      throw error;
    }
  },
}));
