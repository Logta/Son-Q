import { create } from "zustand";
import type { Auth } from "@son-q/types";
import { notImplemented } from "packages/utils/lib";

type NotificationFunction = (message: string) => void;

type QuestionsState = {
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
 * 質問投稿ページ用状態管理ストア
 */
export const useQuestionsStore = create<QuestionsState>((set) => ({
  user: null,
  projectId: "",
  errorMessage: notImplemented,
  successMessage: notImplemented,

  setUser: (user) => set({ user }),

  setProjectId: (projectId) => set({ projectId }),

  setNotificationFunctions: (functions) => set(functions),
}));
