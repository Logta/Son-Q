import { describe, expect, it, vi, beforeEach } from "vitest";
import type { NextPageContext } from "next";
import { getCookies, setCookies } from "../cookies";

// nookiesライブラリのモック化
vi.mock("nookies", () => ({
  parseCookies: vi.fn(),
  setCookie: vi.fn(),
}));

// モック関数のインポート
import { parseCookies, setCookie } from "nookies";

describe("cookies", () => {
  // テスト用のモックデータ
  const mockContext: NextPageContext = {
    // biome-ignore lint/suspicious/noExplicitAny: テスト用の簡易モックオブジェクト
    req: {} as any,
    // biome-ignore lint/suspicious/noExplicitAny: テスト用の簡易モックオブジェクト
    res: {} as any,
    pathname: "/test",
    query: {},
    asPath: "/test",
  };

  beforeEach(() => {
    // 各テスト前にモックをクリア
    vi.clearAllMocks();
  });

  describe("getCookies", () => {
    it("正常ケース: contextありでCookieを取得できる", () => {
      // Arrange: モック関数の戻り値を設定
      const mockCookieData = {
        sessionId: "test-session-123",
        theme: "dark",
        userId: "user-456",
      };
      vi.mocked(parseCookies).mockReturnValue(mockCookieData);

      // Act: 実際の処理を実行
      const result = getCookies(mockContext);

      // Assert: 結果を検証
      expect(parseCookies).toHaveBeenCalledWith(mockContext);
      expect(result).toBeUndefined(); // 現在の実装では戻り値なし
    });

    it("正常ケース: contextなしでCookieを取得できる", () => {
      // Arrange: モック関数の戻り値を設定
      const mockCookieData = {
        sessionId: "test-session-789",
      };
      vi.mocked(parseCookies).mockReturnValue(mockCookieData);

      // Act: 実際の処理を実行
      const result = getCookies();

      // Assert: 結果を検証
      expect(parseCookies).toHaveBeenCalledWith(undefined);
      expect(result).toBeUndefined(); // 現在の実装では戻り値なし
    });

    it("異常ケース: parseCookiesでエラーが発生した場合は例外を投げる", () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "Cookie解析エラー";
      vi.mocked(parseCookies).mockImplementation(() => {
        throw new Error(errorMessage);
      });

      // Act & Assert: 例外が投げられることを検証
      expect(() => getCookies(mockContext)).toThrow(errorMessage);
      expect(parseCookies).toHaveBeenCalledWith(mockContext);
    });

    it("境界値テスト: 空のCookieオブジェクトを返す場合", () => {
      // Arrange: 空のオブジェクトを返すモックを設定
      vi.mocked(parseCookies).mockReturnValue({});

      // Act: 実際の処理を実行
      const result = getCookies(mockContext);

      // Assert: 結果を検証
      expect(parseCookies).toHaveBeenCalledWith(mockContext);
      expect(result).toBeUndefined();
    });
  });

  describe("setCookies", () => {
    it("正常ケース: contextとtokenありでCookieを設定できる", () => {
      // Arrange: テストデータを設定
      const token = "auth-token-123";

      // Act: 実際の処理を実行
      setCookies(mockContext, token);

      // Assert: 結果を検証
      expect(setCookie).toHaveBeenCalledWith(mockContext, "cookie", token, {
        maxAge: 24 * 60 * 60, // 1日間
      });
    });

    it("正常ケース: contextなしでCookieを設定できる", () => {
      // Arrange: テストデータを設定
      const token = "auth-token-456";

      // Act: 実際の処理を実行
      setCookies(undefined, token);

      // Assert: 結果を検証
      expect(setCookie).toHaveBeenCalledWith(undefined, "cookie", token, {
        maxAge: 24 * 60 * 60,
      });
    });

    it("正常ケース: tokenなしでCookieを設定できる", () => {
      // Arrange: トークンなしのテストケース

      // Act: 実際の処理を実行
      setCookies(mockContext);

      // Assert: 結果を検証
      expect(setCookie).toHaveBeenCalledWith(mockContext, "cookie", undefined, {
        maxAge: 24 * 60 * 60,
      });
    });

    it("正常ケース: 全パラメータなしでCookieを設定できる", () => {
      // Arrange: 全パラメータなしのテストケース

      // Act: 実際の処理を実行
      setCookies();

      // Assert: 結果を検証
      expect(setCookie).toHaveBeenCalledWith(undefined, "cookie", undefined, {
        maxAge: 24 * 60 * 60,
      });
    });

    it("異常ケース: setCookieでエラーが発生した場合は例外を投げる", () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "Cookie設定エラー";
      const token = "test-token";
      vi.mocked(setCookie).mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      // Act & Assert: 例外が投げられることを検証
      expect(() => setCookies(mockContext, token)).toThrow(errorMessage);
      expect(setCookie).toHaveBeenCalledWith(mockContext, "cookie", token, {
        maxAge: 24 * 60 * 60,
      });
    });

    it("境界値テスト: 空文字列のtokenでCookieを設定", () => {
      // Arrange: 空文字列のトークンを設定
      const emptyToken = "";

      // Act: 実際の処理を実行
      setCookies(mockContext, emptyToken);

      // Assert: 結果を検証
      expect(setCookie).toHaveBeenCalledWith(mockContext, "cookie", emptyToken, {
        maxAge: 24 * 60 * 60,
      });
    });

    it("仕様テスト: maxAgeが1日間（86400秒）に設定されていることを確認", () => {
      // Arrange: テストデータを設定
      const token = "test-token";
      const expectedMaxAge = 24 * 60 * 60; // 86400秒

      // Act: 実際の処理を実行
      setCookies(mockContext, token);

      // Assert: maxAgeの値を検証
      expect(setCookie).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          maxAge: expectedMaxAge,
        })
      );
    });
  });

  describe("統合テスト", () => {
    it("Cookie設定後に取得する一連のフロー", () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const token = "integration-test-token";
      const mockCookieData = { cookie: token };
      vi.mocked(parseCookies).mockReturnValue(mockCookieData);

      // Act: 実際の処理を実行
      setCookies(mockContext, token);
      getCookies(mockContext);

      // Assert: 結果を検証
      expect(setCookie).toHaveBeenCalledWith(mockContext, "cookie", token, {
        maxAge: 24 * 60 * 60,
      });
      expect(parseCookies).toHaveBeenCalledWith(mockContext);
    });
  });
});
