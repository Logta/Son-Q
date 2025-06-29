import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnswer, createAnswer, updateAnswer, registerAnswer } from "../firebase/answers";
import { awaitOnAuth } from "../firebase/auth";
import type { Answer } from "../models/Answer";

/**
 * 回答一覧取得用のカスタムフック（Suspense対応）
 */
export const useAnswers = (projectId: string) => {
  return useQuery({
    queryKey: ["answers", projectId],
    queryFn: async () => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await getAnswer(user, projectId);
    },
    enabled: !!projectId, // projectIdが存在する場合のみクエリを実行
  });
};

/**
 * 回答作成用のカスタムフック
 */
export const useCreateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      projectId, 
      answer, 
      questionNo 
    }: { 
      projectId: string; 
      answer: Answer;
      questionNo: number;
    }) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await createAnswer(user, answer, projectId, questionNo);
    },
    onSuccess: (_, { projectId }) => {
      // 該当プロジェクトの回答一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["answers", projectId] });
    },
  });
};

/**
 * 回答更新用のカスタムフック
 */
export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      projectId,
      answer,
      questionNo
    }: { 
      projectId: string;
      answer: Answer; 
      questionNo: number;
    }) => {
      return await updateAnswer(answer, projectId, questionNo);
    },
    onSuccess: (_, { projectId }) => {
      // 該当プロジェクトの回答一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["answers", projectId] });
    },
  });
};

/**
 * 回答一括登録用のカスタムフック
 */
export const useRegisterAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, answers }: { projectId: string; answers: Answer[] }) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) {
        throw new Error("User not authenticated");
      }
      return await registerAnswer(user, answers, projectId);
    },
    onSuccess: (_, { projectId }) => {
      // 該当プロジェクトの回答一覧を無効化して再取得
      queryClient.invalidateQueries({ queryKey: ["answers", projectId] });
    },
  });
};