import type { Auth, Project } from "@son-q/types";
import { createProject, getProject, joinProject } from "./firebase";
import { getProjectMode } from "./firebase/results";

/**
 * プロジェクト関連のAPI操作（Vanilla JS）
 * Reactに依存せず、純粋なデータ操作ロジック
 */
export const projectsApi = {
  /**
   * プロジェクト一覧を取得
   */
  getAll: async (user: Auth): Promise<Project[]> => {
    return await getProject(user);
  },

  /**
   * プロジェクトを作成
   */
  create: async (user: Auth, project: Project) => {
    return await createProject(user, project);
  },

  /**
   * プロジェクトに参加
   */
  join: async (user: Auth, projectId: string, _userName: string) => {
    return await joinProject(user, projectId);
  },

  /**
   * プロジェクトモードを取得
   */
  getMode: async (projectId: string): Promise<string> => {
    return await getProjectMode(projectId);
  },
};
