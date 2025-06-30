import { 
  getQuestion, 
  createQuestion, 
  updateQuestion, 
  registerQuestion,
  getAllQuestions,
  getQuestionNum
} from "./firebase";
import type { Auth, Question } from "@son-q/types";

/**
 * 問題関連のAPI操作（Vanilla JS）
 * Reactに依存せず、純粋なデータ操作ロジック
 */
export const questionsApi = {
  /**
   * プロジェクトの問題一覧を取得
   */
  getByProject: async (user: Auth, projectId: string): Promise<Question[]> => {
    return await getQuestion(user, projectId);
  },

  /**
   * 全ての問題を取得
   */
  getAll: async (projectId: string): Promise<Question[]> => {
    return await getAllQuestions(projectId);
  },

  /**
   * 問題を作成
   */
  create: async (user: Auth, question: Question, projectId: string) => {
    return await createQuestion(user, question, projectId);
  },

  /**
   * 問題を更新
   */
  update: async (user: Auth, question: Question, projectId: string) => {
    return await updateQuestion(user, question, projectId);
  },

  /**
   * 問題を一括登録
   */
  register: async (user: Auth, questions: Question[], projectId: string) => {
    return await registerQuestion(user, questions, projectId);
  },

  /**
   * 問題数を取得
   */
  getCount: async (projectId: string): Promise<number> => {
    return await getQuestionNum(projectId);
  },
};