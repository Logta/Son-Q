import type { Auth } from "@son-q/types";
import React from "react";

/**
 * AnswersContext: Client State専用のContext
 * Server State（answers、questions、participants、questionNum）は各コンポーネントでTanStack Queryフックを直接使用
 */
type AnswersContextType = {
  user?: Auth;
  projectId: string;
  errorMessage: (message: string) => void;
  successMessage: (message: string) => void;
};

export const AnswersContext = React.createContext<AnswersContextType>({
  user: undefined,
  projectId: "",
  errorMessage: () => {
    // デフォルトの空実装
  },
  successMessage: () => {
    // デフォルトの空実装
  },
});
