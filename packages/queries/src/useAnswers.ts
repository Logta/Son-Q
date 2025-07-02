import { answersApi, authApi } from "@son-q/api";
import type { Answer } from "@son-q/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 回答関連のReact Queryフック
 * API層を呼び出すReact固有のデータフェッチロジック
 *
 * 境界線：
 * - この層はReact Query（React依存）専用
 * - 純粋なデータ操作は /api 層に委譲
 * - UIコンポーネントはこの層のフックのみを使用
 */

/**
 * ユーザーの回答取得用のカスタムフック
 */
export const useUserAnswers = (projectId: string) => {
  return useQuery({
    queryKey: ["answers", projectId],
    queryFn: async () => {
      const user = await authApi.getCurrentUser();
      return await answersApi.getUserAnswers(user, projectId);
    },
    enabled: !!projectId,
  });
};

/**
 * 全回答取得用のカスタムフック
 */
export const useAllAnswers = (projectId: string) => {
  return useQuery({
    queryKey: ["allAnswers", projectId],
    queryFn: () => answersApi.getAll(projectId),
    enabled: !!projectId,
  });
};

/**
 * 参加者一覧取得用のカスタムフック
 */
export const useParticipants = (projectId: string) => {
  return useQuery({
    queryKey: ["participants", projectId],
    queryFn: () => answersApi.getParticipants(projectId),
    enabled: !!projectId,
  });
};

/**
 * 問題数取得用のカスタムフック
 */
export const useQuestionNumber = (projectId: string) => {
  return useQuery({
    queryKey: ["questionNumber", projectId],
    queryFn: () => answersApi.getQuestionNumber(projectId),
    enabled: !!projectId,
  });
};

/**
 * 既存回答数取得用のカスタムフック
 */
export const useExistingAnswerCount = (projectId: string) => {
  return useQuery({
    queryKey: ["existingAnswerCount", projectId],
    queryFn: () => answersApi.getExistingCount(projectId),
    enabled: !!projectId,
  });
};

/**
 * 回答一括登録用のカスタムフック
 */
export const useRegisterAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, answers }: { projectId: string; answers: Answer[] }) => {
      const user = await authApi.getCurrentUser();
      return await answersApi.register(user, answers, projectId);
    },
    onSuccess: (_, { projectId }) => {
      // 関連するクエリを無効化
      queryClient.invalidateQueries({ queryKey: ["answers", projectId] });
      queryClient.invalidateQueries({ queryKey: ["allAnswers", projectId] });
      queryClient.invalidateQueries({ queryKey: ["existingAnswerCount", projectId] });
    },
  });
};

// 後方互換性のために旧名前でもエクスポート
export const useAnswers = useUserAnswers;
