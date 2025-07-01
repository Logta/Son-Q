import type { Auth } from "@son-q/types";
import { notImplemented } from "@son-q/utils";
import { create } from "zustand";

type NotificationFunction = (message: string) => void;
type AnswersState = {
  /** 認証ユーザー情報 */
  user: Auth | null;
  /** プロジェクトID */
  projectId: string;
  /** エラー通知関数 */
  errorMessage: NotificationFunction;
  /** 成功通知関数 */
  successMessage: NotificationFunction;
  /** ユーザー情報を設定 */
  setUser: (user: Auth | null) => void;
  /** プロジェクトIDを設定 */
  setProjectId: (projectId: string) => void;
  /** 通知関数を設定 */
  setNotificationFunctions: (functions: {
    errorMessage: NotificationFunction;
    successMessage: NotificationFunction;
  }) => void;
};

/**
 * 回答ページ用状態管理ストア
 */
export const useAnswersStore = create<AnswersState>((set) => ({
  user: null,
  projectId: "",
  errorMessage: notImplemented,
  successMessage: notImplemented,

  setUser: (user) => set({ user }),

  setProjectId: (projectId) => set({ projectId }),

  setNotificationFunctions: (functions) => set(functions),
}));
