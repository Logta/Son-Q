import type { User } from "@son-q/types";
import React from "react";

/**
 * ProjectsContext: Client State専用のContext
 * Server Stateは各コンポーネントでTanStack Queryフックを直接使用
 */
type ProjectsContextType = {
  user: User;
  errorMessage: (message: string) => void;
  successMessage: (message: string) => void;
  warningMessage: (message: string) => void;
};

export const ProjectsContext = React.createContext<ProjectsContextType>({
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  errorMessage: () => {
    // デフォルトの空実装
  },
  successMessage: () => {
    // デフォルトの空実装
  },
  warningMessage: () => {
    // デフォルトの空実装
  },
});
