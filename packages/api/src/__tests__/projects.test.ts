import { describe, expect, it, vi, beforeEach } from "vitest";
import type { Auth, Project } from "@son-q/types";
import { projectsApi } from "../projects";

// Firebase関数のモック化
vi.mock("../firebase", () => ({
  createProject: vi.fn(),
  getProject: vi.fn(),
  joinProject: vi.fn(),
}));

vi.mock("../firebase/results", () => ({
  getProjectMode: vi.fn(),
}));

// モック関数のインポート
import { createProject, getProject, joinProject } from "../firebase";
import { getProjectMode } from "../firebase/results";

describe("projectsApi", () => {
  // テスト用のモックデータ
  const mockUser: Auth = {
    uid: "test-uid",
    email: "test@example.com",
  };

  const mockProject: Project = {
    id: "project-123",
    name: "テストプロジェクト",
    description: "テスト用のプロジェクト",
    created_at: new Date(),
  };

  const mockProjects: Project[] = [
    mockProject,
    {
      id: "project-456",
      name: "プロジェクト2",
      description: "2番目のプロジェクト",
      created_at: new Date(),
    },
  ];

  beforeEach(() => {
    // 各テスト前にモックをクリア
    vi.clearAllMocks();
  });

  describe("getAll", () => {
    it("正常ケース: ユーザーのプロジェクト一覧を正しく取得できる", async () => {
      // Arrange: モック関数の戻り値を設定
      vi.mocked(getProject).mockResolvedValue(mockProjects);

      // Act: 実際の処理を実行
      const result = await projectsApi.getAll(mockUser);

      // Assert: 結果を検証
      expect(getProject).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockProjects);
    });

    it("異常ケース: Firebase関数でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "Firebase接続エラー";
      vi.mocked(getProject).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(projectsApi.getAll(mockUser)).rejects.toThrow(errorMessage);
      expect(getProject).toHaveBeenCalledWith(mockUser);
    });

    it("境界値テスト: 空の配列を返す場合", async () => {
      // Arrange: 空の配列を返すモックを設定
      vi.mocked(getProject).mockResolvedValue([]);

      // Act: 実際の処理を実行
      const result = await projectsApi.getAll(mockUser);

      // Assert: 結果を検証
      expect(result).toEqual([]);
      expect(getProject).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("create", () => {
    it("正常ケース: プロジェクトを正しく作成できる", async () => {
      // Arrange: モック関数の戻り値を設定
      const createResult = { message: "作成が完了しました", variant: "success" };
      vi.mocked(createProject).mockResolvedValue(createResult);

      // Act: 実際の処理を実行
      const result = await projectsApi.create(mockUser, mockProject);

      // Assert: 結果を検証
      expect(createProject).toHaveBeenCalledWith(mockUser, mockProject);
      expect(result).toEqual(createResult);
    });

    it("異常ケース: プロジェクト作成でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: エラーを投げるモックを設定
      const errorMessage = "プロジェクト作成失敗";
      vi.mocked(createProject).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(projectsApi.create(mockUser, mockProject)).rejects.toThrow(errorMessage);
      expect(createProject).toHaveBeenCalledWith(mockUser, mockProject);
    });
  });

  describe("join", () => {
    it("正常ケース: プロジェクトに正しく参加できる", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const projectId = "project-123";
      const userName = "テストユーザー";
      const joinResult = { message: "更新が完了しました", variant: "success" };
      vi.mocked(joinProject).mockResolvedValue(joinResult);

      // Act: 実際の処理を実行
      const result = await projectsApi.join(mockUser, projectId, userName);

      // Assert: 結果を検証
      expect(joinProject).toHaveBeenCalledWith(mockUser, projectId);
      expect(result).toEqual(joinResult);
    });

    it("異常ケース: プロジェクト参加でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: テストデータとエラーを投げるモックを設定
      const projectId = "project-123";
      const userName = "テストユーザー";
      const errorMessage = "プロジェクト参加失敗";
      vi.mocked(joinProject).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(projectsApi.join(mockUser, projectId, userName)).rejects.toThrow(errorMessage);
      expect(joinProject).toHaveBeenCalledWith(mockUser, projectId);
    });

    it("注意: userNameパラメータは使用されていない", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const projectId = "project-123";
      const userName = "テストユーザー";
      vi.mocked(joinProject).mockResolvedValue({ message: "更新が完了しました", variant: "success" });

      // Act: 実際の処理を実行
      await projectsApi.join(mockUser, projectId, userName);

      // Assert: joinProjectにはuserNameが渡されていないことを確認
      expect(joinProject).toHaveBeenCalledWith(mockUser, projectId);
      expect(joinProject).not.toHaveBeenCalledWith(mockUser, projectId, userName);
    });
  });

  describe("getMode", () => {
    it("正常ケース: プロジェクトモードを正しく取得できる", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const projectId = "project-123";
      const mockMode = "active";
      vi.mocked(getProjectMode).mockResolvedValue(mockMode);

      // Act: 実際の処理を実行
      const result = await projectsApi.getMode(projectId);

      // Assert: 結果を検証
      expect(getProjectMode).toHaveBeenCalledWith(projectId);
      expect(result).toBe(mockMode);
    });

    it("異常ケース: プロジェクトモード取得でエラーが発生した場合は例外を投げる", async () => {
      // Arrange: テストデータとエラーを投げるモックを設定
      const projectId = "project-123";
      const errorMessage = "モード取得失敗";
      vi.mocked(getProjectMode).mockRejectedValue(new Error(errorMessage));

      // Act & Assert: 例外が投げられることを検証
      await expect(projectsApi.getMode(projectId)).rejects.toThrow(errorMessage);
      expect(getProjectMode).toHaveBeenCalledWith(projectId);
    });

    it("境界値テスト: 空文字列のモードを返す場合", async () => {
      // Arrange: テストデータと空文字列を返すモックを設定
      const projectId = "project-123";
      vi.mocked(getProjectMode).mockResolvedValue("");

      // Act: 実際の処理を実行
      const result = await projectsApi.getMode(projectId);

      // Assert: 結果を検証
      expect(result).toBe("");
      expect(getProjectMode).toHaveBeenCalledWith(projectId);
    });
  });

  describe("APIの統合テスト", () => {
    it("プロジェクトの作成から参加までの一連のフロー", async () => {
      // Arrange: テストデータとモック関数の戻り値を設定
      const newProjectId = "new-project";
      const userName = "テストユーザー";
      vi.mocked(createProject).mockResolvedValue({ message: "作成が完了しました", variant: "success" });
      vi.mocked(joinProject).mockResolvedValue({ message: "更新が完了しました", variant: "success" });
      vi.mocked(getProjectMode).mockResolvedValue("active");

      // Act: 実際の処理を実行
      await projectsApi.create(mockUser, mockProject);
      await projectsApi.join(mockUser, newProjectId, userName);
      const mode = await projectsApi.getMode(newProjectId);

      // Assert: 結果を検証
      expect(createProject).toHaveBeenCalledTimes(1);
      expect(joinProject).toHaveBeenCalledTimes(1);
      expect(getProjectMode).toHaveBeenCalledTimes(1);
      expect(mode).toBe("active");
    });
  });
});