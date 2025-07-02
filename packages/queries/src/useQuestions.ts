import { authApi, questionsApi } from "@son-q/api";
import type { Question } from "@son-q/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * 問題関連のReact Queryフック
 * API層を呼び出すReact固有のデータフェッチロジック
 *
 * 境界線：
 * - この層はReact Query（React依存）専用
 * - 純粋なデータ操作は /api 層に委譲
 * - UIコンポーネントはこの層のフックのみを使用
 */

/**
 * 問題一覧取得用のカスタムフック（Suspense対応）
 */
export const useQuestions = (projectId: string) => {
  return useQuery({
    queryKey: ["allQuestions", projectId],
    queryFn: async () => {
      return await questionsApi.getAll(projectId);
    },
    enabled: !!projectId,
  });
};

/**
 * 全問題取得用のカスタムフック（明示的な名前）
 */
export const useAllQuestions = (projectId: string) => {
  return useQuery({
    queryKey: ["allQuestions", projectId],
    queryFn: async () => {
      return await questionsApi.getAll(projectId);
    },
    enabled: !!projectId,
  });
};

/**
 * ユーザーが出題した問題のみ取得用のカスタムフック
 */
export const useUserQuestions = (projectId: string) => {
  return useQuery({
    queryKey: ["userQuestions", projectId],
    queryFn: async () => {
      const user = await authApi.getCurrentUser();
      return await questionsApi.getByProject(user, projectId);
    },
    enabled: !!projectId,
  });
};

/**
 * 問題数取得用のカスタムフック
 */
export const useQuestionCount = (projectId: string) => {
  return useQuery({
    queryKey: ["questionCount", projectId],
    queryFn: () => questionsApi.getCount(projectId),
    enabled: !!projectId,
  });
};

/**
 * 問題作成用のカスタムフック
 */
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, question }: { projectId: string; question: Question }) => {
      const user = await authApi.getCurrentUser();
      return await questionsApi.create(user, question, projectId);
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["questions", projectId] });
      queryClient.invalidateQueries({ queryKey: ["questionCount", projectId] });
    },
  });
};

/**
 * 問題更新用のカスタムフック
 */
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, question }: { projectId: string; question: Question }) => {
      const user = await authApi.getCurrentUser();
      return await questionsApi.update(user, question, projectId);
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["questions", projectId] });
    },
  });
};

/**
 * 問題一括登録用のカスタムフック
 */
export const useRegisterQuestions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, questions }: { projectId: string; questions: Question[] }) => {
      const user = await authApi.getCurrentUser();
      return await questionsApi.register(user, questions, projectId);
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["questions", projectId] });
      queryClient.invalidateQueries({ queryKey: ["questionCount", projectId] });
    },
  });
};
