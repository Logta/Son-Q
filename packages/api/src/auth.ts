import { awaitOnAuth } from "./firebase";
import type { Auth } from "@son-q/types";

/**
 * 認証関連のAPI操作（Vanilla JS）
 * Reactに依存せず、純粋なデータ操作ロジック
 */
export const authApi = {
  /**
   * 現在のユーザーを取得
   */
  getCurrentUser: async (): Promise<Auth> => {
    const user = await awaitOnAuth();
    if (!user || !user.ok) {
      throw new Error("認証エラー");
    }
    return user;
  },
};