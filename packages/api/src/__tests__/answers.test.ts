import type { Answer, Auth, Participant } from "@son-q/types";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { answersApi } from "../answers";

// Firebase関数のモック化
vi.mock("../firebase", () => ({
  createAnswer: vi.fn(),
  getAllAnswers: vi.fn(),
  getAnswer: vi.fn(),
  getExistAnswerNum: vi.fn(),
  getParticipants: vi.fn(),
  getQuestionNumber: vi.fn(),
  registerAnswer: vi.fn(),
  updateAnswer: vi.fn(),
}));

// モック関数のインポート
import {
  createAnswer,
  getAllAnswers,
  getAnswer,
  getExistAnswerNum,
  getParticipants,
  getQuestionNumber,
  registerAnswer,
  updateAnswer,
} from "../firebase";

describe("answersApi", () => {
  // テスト用のモックデータ
  const mockUser: Auth = {
    id: "test-uid",
    name: "test-user",
    ok: true,
  };

  const mockAnswer: Answer = {
    ID: "answer1",
    no: 1,
    guess_user_id: "user1",
    select_user_id: "user2",
    answer_user_id: "user3",
    url: "https://example.com/song1",
    question_id: "question1",
  };

  const mockAnswers: Answer[] = [
    mockAnswer,
    {
      ID: "answer2",
      no: 2,
      guess_user_id: "user2",
      select_user_id: "user1",
      answer_user_id: "user3",
      url: "https://example.com/song2",
      question_id: "question2",
    },
  ];

  const mockParticipants: Participant[] = [
    { user_id: "user1", user_name: "田中太郎" },
    { user_id: "user2", user_name: "佐藤花子" },
    { user_id: "user3", user_name: "山田次郎" },
  ];

  const projectId = "project-123";

  beforeEach(() => {
    // 各テスト前にモックをクリア
    vi.clearAllMocks();
  });

  describe("getUserAnswers", () => {
    it("正常ケース: ユーザーの回答を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      vi.mocked(getAnswer).mockResolvedValue(mockAnswers);

      // Act: 実際の処理を実行
      const result = await answersApi.getUserAnswers(mockUser, projectId);

      // Assert: 結果を検証
      expect(getAnswer).toHaveBeenCalledWith(mockUser, projectId);
      expect(result).toEqual(mockAnswers);
    });

    it("異常ケース: Firebase関数でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "回答取得エラー";
      vi.mocked(getAnswer).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(answersApi.getUserAnswers(mockUser, projectId)).rejects.toThrow(errorMessage);
      expect(getAnswer).toHaveBeenCalledWith(mockUser, projectId);
    });
  });

  describe("getAll", () => {
    it("正常ケース: 全ての回答を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      vi.mocked(getAllAnswers).mockResolvedValue(mockAnswers);

      // Act: 実際の処理を実行
      const result = await answersApi.getAll(projectId);

      // Assert: 結果を検証
      expect(getAllAnswers).toHaveBeenCalledWith(projectId);
      expect(result).toEqual(mockAnswers);
    });

    it("境界値テスト: 空の配列を返す場合", async () => {
      // Arrange: 空の配列を返すモックを設定
      vi.mocked(getAllAnswers).mockResolvedValue([]);

      // Act: 実際の処理を実行
      const result = await answersApi.getAll(projectId);

      // Assert: 結果を検証
      expect(result).toEqual([]);
      expect(getAllAnswers).toHaveBeenCalledWith(projectId);
    });
  });

  describe("create", () => {
    it("正常ケース: 回答を正しく作成できる", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const questionNo = 1;
      const createResult = { message: "回答が作成されました", variant: "success" };
      vi.mocked(createAnswer).mockResolvedValue(createResult);

      // Act: 実際の処理を実行
      const result = await answersApi.create(mockUser, mockAnswer, projectId, questionNo);

      // Assert: 結果を検証
      expect(createAnswer).toHaveBeenCalledWith(mockUser, mockAnswer, projectId, questionNo);
      expect(result).toEqual(createResult);
    });

    it("異常ケース: 回答作成でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: テストデータとエラーを投げるモックを設定
      const questionNo = 1;
      const errorMessage = "回答作成失敗";
      vi.mocked(createAnswer).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(answersApi.create(mockUser, mockAnswer, projectId, questionNo)).rejects.toThrow(
        errorMessage
      );
      expect(createAnswer).toHaveBeenCalledWith(mockUser, mockAnswer, projectId, questionNo);
    });
  });

  describe("update", () => {
    it("正常ケース: 回答を正しく更新できる", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const questionNo = 1;
      const updateResult = { message: "回答が更新されました", variant: "success" };
      vi.mocked(updateAnswer).mockResolvedValue(updateResult);

      // Act: 実際の処理を実行
      const result = await answersApi.update(mockAnswer, projectId, questionNo);

      // Assert: 結果を検証
      expect(updateAnswer).toHaveBeenCalledWith(mockAnswer, projectId, questionNo);
      expect(result).toEqual(updateResult);
    });

    it("異常ケース: 回答更新でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: テストデータとエラーを投げるモックを設定
      const questionNo = 1;
      const errorMessage = "回答更新失敗";
      vi.mocked(updateAnswer).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(answersApi.update(mockAnswer, projectId, questionNo)).rejects.toThrow(
        errorMessage
      );
      expect(updateAnswer).toHaveBeenCalledWith(mockAnswer, projectId, questionNo);
    });
  });

  describe("register", () => {
    it("正常ケース: 回答を一括登録できる", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const registerResult = { message: "回答が一括登録されました", variant: "success" };
      vi.mocked(registerAnswer).mockResolvedValue(registerResult);

      // Act: 実際の処理を実行
      const result = await answersApi.register(mockUser, mockAnswers, projectId);

      // Assert: 結果を検証
      expect(registerAnswer).toHaveBeenCalledWith(mockUser, mockAnswers, projectId);
      expect(result).toEqual(registerResult);
    });

    it("境界値テスト: 空の回答配列での一括登録", async () => {
      // Arrange: 空の配列とモック関数の戻り値を設定
      const emptyAnswers: Answer[] = [];
      const registerResult = { message: "回答が一括登録されました", variant: "success" };
      vi.mocked(registerAnswer).mockResolvedValue(registerResult);

      // Act: 実際の処理を実行
      const result = await answersApi.register(mockUser, emptyAnswers, projectId);

      // Assert: 結果を検証
      expect(registerAnswer).toHaveBeenCalledWith(mockUser, emptyAnswers, projectId);
      expect(result).toEqual(registerResult);
    });
  });

  describe("getExistingCount", () => {
    it("正常ケース: 既存回答数を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const existingCount = 5;
      vi.mocked(getExistAnswerNum).mockResolvedValue(existingCount);

      // Act: 実際の処理を実行
      const result = await answersApi.getExistingCount(projectId);

      // Assert: 結果を検証
      expect(getExistAnswerNum).toHaveBeenCalledWith(projectId);
      expect(result).toBe(existingCount);
    });

    it("境界値テスト: 既存回答数が0の場合", async () => {
      // Arrange: 0を返すモックを設定
      vi.mocked(getExistAnswerNum).mockResolvedValue(0);

      // Act: 実際の処理を実行
      const result = await answersApi.getExistingCount(projectId);

      // Assert: 結果を検証
      expect(result).toBe(0);
      expect(getExistAnswerNum).toHaveBeenCalledWith(projectId);
    });
  });

  describe("getQuestionNumber", () => {
    it("正常ケース: 問題数を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const questionCount = 10;
      vi.mocked(getQuestionNumber).mockResolvedValue(questionCount);

      // Act: 実際の処理を実行
      const result = await answersApi.getQuestionNumber(projectId);

      // Assert: 結果を検証
      expect(getQuestionNumber).toHaveBeenCalledWith(projectId);
      expect(result).toBe(questionCount);
    });

    it("境界値テスト: 問題数が1の場合", async () => {
      // Arrange: 1を返すモックを設定
      vi.mocked(getQuestionNumber).mockResolvedValue(1);

      // Act: 実際の処理を実行
      const result = await answersApi.getQuestionNumber(projectId);

      // Assert: 結果を検証
      expect(result).toBe(1);
      expect(getQuestionNumber).toHaveBeenCalledWith(projectId);
    });
  });

  describe("getParticipants", () => {
    it("正常ケース: 参加者一覧を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      vi.mocked(getParticipants).mockResolvedValue(mockParticipants);

      // Act: 実際の処理を実行
      const result = await answersApi.getParticipants(projectId);

      // Assert: 結果を検証
      expect(getParticipants).toHaveBeenCalledWith(projectId);
      expect(result).toEqual(mockParticipants);
    });

    it("境界値テスト: 参加者が1人の場合", async () => {
      // Arrange: 1人の参加者を返すモックを設定
      const singleParticipant = [mockParticipants[0]];
      vi.mocked(getParticipants).mockResolvedValue(singleParticipant);

      // Act: 実際の処理を実行
      const result = await answersApi.getParticipants(projectId);

      // Assert: 結果を検証
      expect(result).toEqual(singleParticipant);
      expect(getParticipants).toHaveBeenCalledWith(projectId);
    });
  });

  describe("APIの統合テスト", () => {
    it("回答の作成から取得までの一連のフロー", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const questionNo = 1;
      vi.mocked(createAnswer).mockResolvedValue({
        message: "回答が作成されました",
        variant: "success",
      });
      vi.mocked(getAnswer).mockResolvedValue([mockAnswer]);
      vi.mocked(getExistAnswerNum).mockResolvedValue(1);

      // Act: 実際の処理を実行
      await answersApi.create(mockUser, mockAnswer, projectId, questionNo);
      const userAnswers = await answersApi.getUserAnswers(mockUser, projectId);
      const existingCount = await answersApi.getExistingCount(projectId);

      // Assert: 結果を検証
      expect(createAnswer).toHaveBeenCalledTimes(1);
      expect(getAnswer).toHaveBeenCalledTimes(1);
      expect(getExistAnswerNum).toHaveBeenCalledTimes(1);
      expect(userAnswers).toEqual([mockAnswer]);
      expect(existingCount).toBe(1);
    });
  });
});
