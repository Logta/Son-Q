import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getQuestion, createQuestion, updateQuestion, registerQuestion } from "../firebase/questions";
import { awaitOnAuth } from "../firebase/auth";
import type { Question } from "../models/Question";

/**
 * 問題一覧取得用のカスタムフック（Suspense対応）
 */
export const useQuestions = (projectId: string) => {
  return useQuery({
    queryKey: ["questions", projectId],
    queryFn: async () => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await getQuestion(user, projectId);
    },
    enabled: !!projectId, // projectIdが存在する場合のみクエリを実行
  });
};

/**
 * 問題作成用のカスタムフック
 */
export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, question }: { projectId: string; question: Question }) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await createQuestion(user, question, projectId);
    },
    onSuccess: (_, { projectId }) => {
      // 該当プロジェクトの問題一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["questions", projectId] });
    },
  });
};

/**
 * 問題更新用のカスタムフック
 */
export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      projectId,
      question 
    }: { 
      projectId: string;
      question: Question; 
    }) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await updateQuestion(user, question, projectId);
    },
    onSuccess: (_, { projectId }) => {
      // 該当プロジェクトの問題一覧を無効化して再取得
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
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await registerQuestion(user, questions, projectId);
    },
    onSuccess: (_, { projectId }) => {
      // 該当プロジェクトの問題一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["questions", projectId] });
    },
  });
};