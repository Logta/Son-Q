import React from "react";
import type { Auth } from "@son-q/types";

/**
 * QuestionsContext: Client State専用のContext
 * Server State（questions、participants、questionNum）は各コンポーネントでTanStack Queryフックを直接使用
 */
type QuestionsContextType = {
  user?: Auth;
  projectId: string;
  errorMessage: (message: string) => void;
  successMessage: (message: string) => void;
};

export const QuestionsContext = React.createContext<QuestionsContextType>({
  user: undefined,
  projectId: "",
  errorMessage: () => {},
  successMessage: () => {},
});
