import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Auth } from "@son-q/types";
import { authApi } from "../auth";

// Firebase関数のモック化
vi.mock("../firebase", () => ({
  awaitOnAuth: vi.fn(),
}));

// モック関数のインポート
import { awaitOnAuth } from "../firebase";

describe("authApi", () => {
  beforeEach(() => {
    // 各テスト前にモックをクリア
    vi.clearAllMocks();
  });

  describe("getCurrentUser", () => {
    it("正常ケース: 認証されたユーザーを正しく取得できる", async () => {
      // Arrange: 正常な認証ユーザーのモックデータを設定
      const mockUser: Auth = {
        id: "test-uid-123",
        name: "テストユーザー",
        ok: true,
      };
      vi.mocked(awaitOnAuth).mockResolvedValue(mockUser);

      // Act: 実際の処理を実行
      const result = await authApi.getCurrentUser();

      // Assert: 結果を検証
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it("異常ケース: user.ok = false の場合は認証エラーを投げる", async () => {
      // Arrange: ok = false のユーザーを設定
      const mockInvalidUser: Auth = {
        id: "test-uid-123",
        name: "テストユーザー",
        ok: false,
      };
      vi.mocked(awaitOnAuth).mockResolvedValue(mockInvalidUser);

      // Act & Assert: 認証エラーが投げられることを検証
      await expect(authApi.getCurrentUser()).rejects.toThrow("認証エラー");
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("異常ケース: user = null の場合は認証エラーを投げる", async () => {
      // Arrange: null ユーザーを設定
      vi.mocked(awaitOnAuth).mockResolvedValue(null);

      // Act & Assert: 認証エラーが投げられることを検証
      await expect(authApi.getCurrentUser()).rejects.toThrow("認証エラー");
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("異常ケース: user = undefined の場合は認証エラーを投げる", async () => {
      // Arrange: undefined ユーザーを設定
      vi.mocked(awaitOnAuth).mockResolvedValue(undefined);

      // Act & Assert: 認証エラーが投げられることを検証
      await expect(authApi.getCurrentUser()).rejects.toThrow("認証エラー");
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("異常ケース: awaitOnAuth でネットワークエラーが発生した場合", async () => {
      // Arrange: ネットワークエラーのモックを設定
      const networkError = new Error("ネットワーク接続エラー");
      vi.mocked(awaitOnAuth).mockRejectedValue(networkError);

      // Act & Assert: ネットワークエラーが伝播されることを検証
      await expect(authApi.getCurrentUser()).rejects.toThrow("ネットワーク接続エラー");
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("境界値テスト: user.ok が undefined の場合は認証エラーを投げる", async () => {
      // Arrange: ok プロパティが undefined のユーザーを設定
      const mockUserWithoutOk = {
        id: "test-uid-123",
        name: "テストユーザー",
        // ok プロパティが存在しない
      } as Auth;
      vi.mocked(awaitOnAuth).mockResolvedValue(mockUserWithoutOk);

      // Act & Assert: 認証エラーが投げられることを検証
      await expect(authApi.getCurrentUser()).rejects.toThrow("認証エラー");
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("境界値テスト: 最小限の有効なユーザー情報", async () => {
      // Arrange: 最小限の有効なユーザー情報を設定
      const minimalValidUser: Auth = {
        id: "",
        name: "",
        ok: true,
      };
      vi.mocked(awaitOnAuth).mockResolvedValue(minimalValidUser);

      // Act: 実際の処理を実行
      const result = await authApi.getCurrentUser();

      // Assert: 結果を検証
      expect(result).toEqual(minimalValidUser);
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("境界値テスト: すべてのプロパティが設定されたユーザー", async () => {
      // Arrange: 全プロパティが設定されたユーザーを設定
      const fullUser: Auth = {
        id: "full-uid-123",
        name: "フルユーザー",
        ok: true,
      };
      vi.mocked(awaitOnAuth).mockResolvedValue(fullUser);

      // Act: 実際の処理を実行
      const result = await authApi.getCurrentUser();

      // Assert: 結果を検証
      expect(result).toEqual(fullUser);
      expect(awaitOnAuth).toHaveBeenCalledTimes(1);
    });

    it("パフォーマンステスト: 複数回連続で呼び出した場合", async () => {
      // Arrange: 正常なユーザーデータを設定
      const mockUser: Auth = {
        id: "test-uid",
        name: "test-user",
        ok: true,
      };
      vi.mocked(awaitOnAuth).mockResolvedValue(mockUser);

      // Act: 複数回連続で呼び出し
      const promises = Array(5).fill(null).map(() => authApi.getCurrentUser());
      const results = await Promise.all(promises);

      // Assert: すべて同じ結果が返されることを検証
      expect(awaitOnAuth).toHaveBeenCalledTimes(5);
      results.forEach(result => {
        expect(result).toEqual(mockUser);
      });
    });
  });
});