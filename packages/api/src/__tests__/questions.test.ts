import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Auth, Question } from "@son-q/types";
import { questionsApi } from "../questions";

// Firebase関数のモック化
vi.mock("../firebase", () => ({
  createQuestion: vi.fn(),
  getAllQuestions: vi.fn(),
  getQuestion: vi.fn(),
  getQuestionNum: vi.fn(),
  registerQuestion: vi.fn(),
  updateQuestion: vi.fn(),
}));

// モック関数のインポート
import {
  createQuestion,
  getAllQuestions,
  getQuestion,
  getQuestionNum,
  registerQuestion,
  updateQuestion,
} from "../firebase";

describe("questionsApi", () => {
  // テスト用のモックデータ
  const mockUser: Auth = {
    id: "test-uid",
    name: "テストユーザー",
    ok: true,
  };

  const mockQuestion: Question = {
    ID: "question1",
    no: 1,
    url: "https://example.com/song1",
    select_user_id: "user1",
  };

  const mockQuestions: Question[] = [
    mockQuestion,
    {
      ID: "question2",
      no: 2,
      url: "https://example.com/song2",
      select_user_id: "user2",
    },
  ];

  const projectId = "project-123";

  beforeEach(() => {
    // 各テスト前にモックをクリア
    vi.clearAllMocks();
  });

  describe("getByProject", () => {
    it("正常ケース: プロジェクトの問題一覧を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      vi.mocked(getQuestion).mockResolvedValue(mockQuestions);

      // Act: 実際の処理を実行
      const result = await questionsApi.getByProject(mockUser, projectId);

      // Assert: 結果を検証
      expect(getQuestion).toHaveBeenCalledWith(mockUser, projectId);
      expect(result).toEqual(mockQuestions);
    });

    it("異常ケース: Firebase関数でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "問題取得エラー";
      vi.mocked(getQuestion).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(questionsApi.getByProject(mockUser, projectId)).rejects.toThrow(errorMessage);
      expect(getQuestion).toHaveBeenCalledWith(mockUser, projectId);
    });

    it("境界値テスト: 空の配列を返す場合", async () => {
      // Arrange: 空の配列を返すモックを設定
      vi.mocked(getQuestion).mockResolvedValue([]);

      // Act: 実際の処理を実行
      const result = await questionsApi.getByProject(mockUser, projectId);

      // Assert: 結果を検証
      expect(result).toEqual([]);
      expect(getQuestion).toHaveBeenCalledWith(mockUser, projectId);
    });
  });

  describe("getAll", () => {
    it("正常ケース: 全ての問題を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      vi.mocked(getAllQuestions).mockResolvedValue(mockQuestions);

      // Act: 実際の処理を実行
      const result = await questionsApi.getAll(projectId);

      // Assert: 結果を検証
      expect(getAllQuestions).toHaveBeenCalledWith(projectId);
      expect(result).toEqual(mockQuestions);
    });

    it("異常ケース: Firebase関数でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "全問題取得エラー";
      vi.mocked(getAllQuestions).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(questionsApi.getAll(projectId)).rejects.toThrow(errorMessage);
      expect(getAllQuestions).toHaveBeenCalledWith(projectId);
    });

    it("境界値テスト: 空文字列のプロジェクトID", async () => {
      // Arrange: 空の配列を返すモックを設定
      vi.mocked(getAllQuestions).mockResolvedValue([]);

      // Act: 実際の処理を実行
      const result = await questionsApi.getAll("");

      // Assert: 結果を検証
      expect(getAllQuestions).toHaveBeenCalledWith("");
      expect(result).toEqual([]);
    });
  });

  describe("create", () => {
    it("正常ケース: 問題を正しく作成できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const createResult = { message: "問題が作成されました", variant: "success" };
      vi.mocked(createQuestion).mockResolvedValue(createResult);

      // Act: 実際の処理を実行
      const result = await questionsApi.create(mockUser, mockQuestion, projectId);

      // Assert: 結果を検証
      expect(createQuestion).toHaveBeenCalledWith(mockUser, mockQuestion, projectId);
      expect(result).toEqual(createResult);
    });

    it("異常ケース: 問題作成でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "問題作成失敗";
      vi.mocked(createQuestion).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(questionsApi.create(mockUser, mockQuestion, projectId)).rejects.toThrow(
        errorMessage
      );
      expect(createQuestion).toHaveBeenCalledWith(mockUser, mockQuestion, projectId);
    });

    it("境界値テスト: 最小限の問題データ", async () => {
      // Arrange: 最小限の問題データとモック関数の戻り値を設定
      const minimalQuestion: Question = {
        ID: "",
        no: 0,
        url: "",
        select_user_id: "",
      };
      const createResult = { message: "作成完了", variant: "success" };
      vi.mocked(createQuestion).mockResolvedValue(createResult);

      // Act: 実際の処理を実行
      const result = await questionsApi.create(mockUser, minimalQuestion, projectId);

      // Assert: 結果を検証
      expect(createQuestion).toHaveBeenCalledWith(mockUser, minimalQuestion, projectId);
      expect(result).toEqual(createResult);
    });
  });

  describe("update", () => {
    it("正常ケース: 問題を正しく更新できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const updateResult = { message: "問題が更新されました", variant: "success" };
      vi.mocked(updateQuestion).mockResolvedValue(updateResult);

      // Act: 実際の処理を実行
      const result = await questionsApi.update(mockUser, mockQuestion, projectId);

      // Assert: 結果を検証
      expect(updateQuestion).toHaveBeenCalledWith(mockUser, mockQuestion, projectId);
      expect(result).toEqual(updateResult);
    });

    it("異常ケース: 問題更新でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "問題更新失敗";
      vi.mocked(updateQuestion).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(questionsApi.update(mockUser, mockQuestion, projectId)).rejects.toThrow(
        errorMessage
      );
      expect(updateQuestion).toHaveBeenCalledWith(mockUser, mockQuestion, projectId);
    });
  });

  describe("register", () => {
    it("正常ケース: 問題を一括登録できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const registerResult = { message: "問題が一括登録されました", variant: "success" };
      vi.mocked(registerQuestion).mockResolvedValue(registerResult);

      // Act: 実際の処理を実行
      const result = await questionsApi.register(mockUser, mockQuestions, projectId);

      // Assert: 結果を検証
      expect(registerQuestion).toHaveBeenCalledWith(mockUser, mockQuestions, projectId);
      expect(result).toEqual(registerResult);
    });

    it("異常ケース: 一括登録でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "一括登録失敗";
      vi.mocked(registerQuestion).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(questionsApi.register(mockUser, mockQuestions, projectId)).rejects.toThrow(
        errorMessage
      );
      expect(registerQuestion).toHaveBeenCalledWith(mockUser, mockQuestions, projectId);
    });

    it("境界値テスト: 空の問題配列での一括登録", async () => {
      // Arrange: 空の配列とモック関数の戻り値を設定
      const emptyQuestions: Question[] = [];
      const registerResult = { message: "登録完了", variant: "success" };
      vi.mocked(registerQuestion).mockResolvedValue(registerResult);

      // Act: 実際の処理を実行
      const result = await questionsApi.register(mockUser, emptyQuestions, projectId);

      // Assert: 結果を検証
      expect(registerQuestion).toHaveBeenCalledWith(mockUser, emptyQuestions, projectId);
      expect(result).toEqual(registerResult);
    });

    it("境界値テスト: 単一の問題での一括登録", async () => {
      // Arrange: 単一の問題配列とモック関数の戻り値を設定
      const singleQuestion = [mockQuestion];
      const registerResult = { message: "登録完了", variant: "success" };
      vi.mocked(registerQuestion).mockResolvedValue(registerResult);

      // Act: 実際の処理を実行
      const result = await questionsApi.register(mockUser, singleQuestion, projectId);

      // Assert: 結果を検証
      expect(registerQuestion).toHaveBeenCalledWith(mockUser, singleQuestion, projectId);
      expect(result).toEqual(registerResult);
    });
  });

  describe("getCount", () => {
    it("正常ケース: 問題数を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const questionCount = 5;
      vi.mocked(getQuestionNum).mockResolvedValue(questionCount);

      // Act: 実際の処理を実行
      const result = await questionsApi.getCount(projectId);

      // Assert: 結果を検証
      expect(getQuestionNum).toHaveBeenCalledWith(projectId);
      expect(result).toBe(questionCount);
    });

    it("異常ケース: 問題数取得でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "問題数取得失敗";
      vi.mocked(getQuestionNum).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(questionsApi.getCount(projectId)).rejects.toThrow(errorMessage);
      expect(getQuestionNum).toHaveBeenCalledWith(projectId);
    });

    it("境界値テスト: 問題数が0の場合", async () => {
      // Arrange: 0を返すモックを設定
      vi.mocked(getQuestionNum).mockResolvedValue(0);

      // Act: 実際の処理を実行
      const result = await questionsApi.getCount(projectId);

      // Assert: 結果を検証
      expect(result).toBe(0);
      expect(getQuestionNum).toHaveBeenCalledWith(projectId);
    });

    it("境界値テスト: 問題数が負数の場合", async () => {
      // Arrange: 負数を返すモックを設定（異常なケース）
      vi.mocked(getQuestionNum).mockResolvedValue(-1);

      // Act: 実際の処理を実行
      const result = await questionsApi.getCount(projectId);

      // Assert: 結果を検証（ビジネスロジックでの検証は別途必要）
      expect(result).toBe(-1);
      expect(getQuestionNum).toHaveBeenCalledWith(projectId);
    });
  });

  describe("APIの統合テスト", () => {
    it("問題の作成から取得までの一連のフロー", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      vi.mocked(createQuestion).mockResolvedValue({ message: "作成完了", variant: "success" });
      vi.mocked(getQuestion).mockResolvedValue([mockQuestion]);
      vi.mocked(getQuestionNum).mockResolvedValue(1);

      // Act: 実際の処理を実行
      await questionsApi.create(mockUser, mockQuestion, projectId);
      const questions = await questionsApi.getByProject(mockUser, projectId);
      const count = await questionsApi.getCount(projectId);

      // Assert: 結果を検証
      expect(createQuestion).toHaveBeenCalledTimes(1);
      expect(getQuestion).toHaveBeenCalledTimes(1);
      expect(getQuestionNum).toHaveBeenCalledTimes(1);
      expect(questions).toEqual([mockQuestion]);
      expect(count).toBe(1);
    });

    it("一括登録から全取得までの一連のフロー", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      vi.mocked(registerQuestion).mockResolvedValue({
        message: "一括登録完了",
        variant: "success",
      });
      vi.mocked(getAllQuestions).mockResolvedValue(mockQuestions);
      vi.mocked(getQuestionNum).mockResolvedValue(mockQuestions.length);

      // Act: 実際の処理を実行
      await questionsApi.register(mockUser, mockQuestions, projectId);
      const allQuestions = await questionsApi.getAll(projectId);
      const count = await questionsApi.getCount(projectId);

      // Assert: 結果を検証
      expect(registerQuestion).toHaveBeenCalledTimes(1);
      expect(getAllQuestions).toHaveBeenCalledTimes(1);
      expect(getQuestionNum).toHaveBeenCalledTimes(1);
      expect(allQuestions).toEqual(mockQuestions);
      expect(count).toBe(mockQuestions.length);
    });
  });
});
