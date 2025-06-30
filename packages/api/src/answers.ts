import { 
  getAnswer, 
  createAnswer, 
  updateAnswer, 
  registerAnswer, 
  getQuestionNumber, 
  getParticipants, 
  getAllAnswers,
  getExistAnswerNum 
} from "./firebase";
import type { Auth, Answer, Participant } from "@son-q/types";

/**
 * 回答関連のAPI操作（Vanilla JS）
 * Reactに依存せず、純粋なデータ操作ロジック
 */
export const answersApi = {
  /**
   * ユーザーの回答を取得
   */
  getUserAnswers: async (user: Auth, projectId: string): Promise<Answer[]> => {
    return await getAnswer(user, projectId);
  },

  /**
   * 全ての回答を取得
   */
  getAll: async (projectId: string): Promise<Answer[]> => {
    return await getAllAnswers(projectId);
  },

  /**
   * 回答を作成
   */
  create: async (user: Auth, answer: Answer, projectId: string, questionNo: number) => {
    return await createAnswer(user, answer, projectId, questionNo);
  },

  /**
   * 回答を更新
   */
  update: async (answer: Answer, projectId: string, questionNo: number) => {
    return await updateAnswer(answer, projectId, questionNo);
  },

  /**
   * 回答を一括登録
   */
  register: async (user: Auth, answers: Answer[], projectId: string) => {
    return await registerAnswer(user, answers, projectId);
  },

  /**
   * 既存回答数を取得
   */
  getExistingCount: async (projectId: string): Promise<number> => {
    return await getExistAnswerNum(projectId);
  },

  /**
   * 問題数を取得
   */
  getQuestionNumber: async (projectId: string): Promise<number> => {
    return await getQuestionNumber(projectId);
  },

  /**
   * 参加者一覧を取得
   */
  getParticipants: async (projectId: string): Promise<Participant[]> => {
    return await getParticipants(projectId);
  },
};