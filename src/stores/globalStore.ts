import {
  awaitOnAuth,
  awaitOnGoogleLogin,
  awaitOnPasswordLogin,
  createPasswordUser,
  signOutFirebase,
} from "@son-q/api";
import type { User } from "@son-q/types";
import { notImplemented } from "packages/utils/lib";
import { create } from "zustand";

type NotificationFunction = (message: string) => void;

type GlobalState = {
  /** 認証されたユーザー情報 */
  user: User | null;
  /** ダークモードの有効/無効 */
  darkMode: boolean;
  /** グローバルローディング状態 */
  loading: boolean;
  /** エラー通知関数 */
  errorMessage: NotificationFunction;
  /** 警告通知関数 */
  warningMessage: NotificationFunction;
  /** 成功通知関数 */
  successMessage: NotificationFunction;
  /** 通知関数を設定 */
  setNotificationFunctions: (functions: {
    errorMessage: NotificationFunction;
    warningMessage: NotificationFunction;
    successMessage: NotificationFunction;
  }) => void;
  /** ユーザー情報を設定 */
  setUser: (user: User | null) => void;
  /** ローディング状態を設定 */
  setLoading: (loading: boolean) => void;
  /** ダークモードを有効化 */
  handleDarkModeOn: () => void;
  /** ダークモードを無効化 */
  handleDarkModeOff: () => void;
  /** 認証状態をチェック */
  signInCheck: () => Promise<User | null>;
  /** 認証状態をチェック（useEffect用） */
  checkAuth: () => Promise<void>;
  /** Googleでサインイン */
  signInGoogle: () => Promise<User | null>;
  /** メールでサインイン */
  signInEmail: (email: string, password: string) => Promise<User | null>;
  /** メールでサインアップ */
  signUpEmail: (email: string, password: string, name: string) => Promise<User | null>;
  /** サインアウト */
  signOut: () => Promise<void>;
};

/**
 * グローバル状態管理ストア
 */
export const useGlobalStore = create<GlobalState>((set, get) => ({
  user: null,
  darkMode: false,
  loading: true,
  errorMessage: notImplemented,
  warningMessage: notImplemented,
  successMessage: notImplemented,

  setNotificationFunctions: (functions) =>
    set((state) => ({
      ...state,
      errorMessage: functions.errorMessage,
      warningMessage: functions.warningMessage,
      successMessage: functions.successMessage,
    })),

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),

  handleDarkModeOn: () => set({ darkMode: true }),

  handleDarkModeOff: () => set({ darkMode: false }),

  signInCheck: async () => {
    try {
      const authUser = await awaitOnAuth();
      if (!authUser?.ok) {
        set({ user: null, loading: false });
        return null;
      }
      const user: User = {
        ID: authUser.id,
        Name: authUser.name,
        Login: true,
      };
      set({ user, loading: false });
      return user;
    } catch (error) {
      console.error("認証チェックエラー:", error);
      set({ user: null, loading: false });
      return null;
    }
  },

  signInGoogle: async () => {
    const { successMessage, errorMessage } = get();
    try {
      const authUser = await awaitOnGoogleLogin();
      if (!authUser?.ok) {
        errorMessage("ログインに失敗しました");
        return null;
      }
      const user: User = {
        ID: authUser.id,
        Name: authUser.name,
        Login: true,
      };
      set({ user });
      successMessage("ログインしました");
      return user;
    } catch (error) {
      console.error("Googleサインインエラー:", error);
      errorMessage("ログインに失敗しました");
      return null;
    }
  },

  signInEmail: async (email: string, password: string) => {
    const { successMessage, errorMessage } = get();
    try {
      const authUser = await awaitOnPasswordLogin({ email, password });
      if (!authUser?.ok) {
        errorMessage("ログインに失敗しました");
        return null;
      }
      const user: User = {
        ID: authUser.id,
        Name: authUser.name,
        Login: true,
      };
      set({ user });
      successMessage("ログインしました");
      return user;
    } catch (error) {
      console.error("メールサインインエラー:", error);
      errorMessage("ログインに失敗しました");
      return null;
    }
  },

  signUpEmail: async (email: string, password: string, _name: string) => {
    const { successMessage, errorMessage } = get();
    try {
      const result = await createPasswordUser({ email, password });
      if (!result) {
        errorMessage("アカウント作成に失敗しました");
        return null;
      }
      // サインアップ後は再度認証状態をチェック
      const authUser = await awaitOnAuth();
      if (!authUser?.ok) {
        errorMessage("アカウント作成後の認証に失敗しました");
        return null;
      }
      const user: User = {
        ID: authUser.id,
        Name: authUser.name,
        Login: true,
      };
      set({ user });
      successMessage("アカウントを作成しました");
      return user;
    } catch (error) {
      console.error("メールサインアップエラー:", error);
      errorMessage("アカウント作成に失敗しました");
      return null;
    }
  },

  signOut: async () => {
    const { successMessage, errorMessage } = get();
    try {
      const result = await signOutFirebase();
      if (result?.ok) {
        set({ user: null });
        successMessage("ログアウトしました");
      } else {
        errorMessage("ログアウトに失敗しました");
      }
    } catch (error) {
      console.error("サインアウトエラー:", error);
      errorMessage("ログアウトに失敗しました");
    }
  },

  checkAuth: async () => {
    try {
      const authUser = await awaitOnAuth();
      if (!authUser?.ok) {
        set({ user: null, loading: false });
        return;
      }
      const user: User = {
        ID: authUser.id,
        Name: authUser.name,
        Login: true,
      };
      set({ user, loading: false });
    } catch (error) {
      console.error("認証チェックエラー:", error);
      set({ user: null, loading: false });
    }
  },
}));
