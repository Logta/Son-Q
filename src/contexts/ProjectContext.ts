import type { Project, User } from "@son-q/types";
import React from "react";

type Props = {
  project: Project;
  user: User;
  getProject: () => Promise<void>;
  updateProjectInfo: (project: Project) => Promise<void>;
  deleteProjectFromID: (id: string) => Promise<void>;
  loading: boolean;
};

export const ProjectContext = React.createContext<Props>({
  project: undefined,
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  getProject: async () => {
    // デフォルトの空実装
  },
  updateProjectInfo: async () => {
    // デフォルトの空実装
  },
  deleteProjectFromID: async () => {
    // デフォルトの空実装
  },
  loading: true,
});
