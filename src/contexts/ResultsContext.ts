import React from "react";
import { Auth } from "@/models";

/**
 * ResultsContext: Client State専用のContext
 * Server State（results、answers、questions、participants、questionNum、projectMode）は各コンポーネントでTanStack Queryフックを直接使用
 */
type ResultsContextType = {
  user?: Auth;
  projectId: string;
  errorMessage: (message: string) => void;
  successMessage: (message: string) => void;
};

export const ResultsContext = React.createContext<ResultsContextType>({
  user: undefined,
  projectId: "",
  errorMessage: () => {},
  successMessage: () => {},
});
