import { create } from "zustand";
import type { User } from "@son-q/types";
import { notImplemented } from "packages/utils/lib";

type NotificationFunction = (message: string) => void;

type ProjectsState = {
  /** ユーザー情報 */
  user: User | null;
  /** エラー通知関数 */
  errorMessage: NotificationFunction;
  /** 警告通知関数 */
  warningMessage: NotificationFunction;
  /** 成功通知関数 */
  successMessage: NotificationFunction;
  /** ユーザー情報を設定 */
  setUser: (user: User | null) => void;
  /** 通知関数を設定 */
  setNotificationFunctions: (functions: {
    errorMessage: NotificationFunction;
    warningMessage: NotificationFunction;
    successMessage: NotificationFunction;
  }) => void;
};

/**
 * プロジェクト一覧ページ用状態管理ストア
 */
export const useProjectsStore = create<ProjectsState>((set) => ({
  user: null,
  errorMessage: notImplemented,
  warningMessage: notImplemented,
  successMessage: notImplemented,

  setUser: (user) => set({ user }),

  setNotificationFunctions: (functions) => set(functions),
}));
