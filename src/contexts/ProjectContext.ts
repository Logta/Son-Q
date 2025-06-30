import React from "react";
import type { Project, User } from "@son-q/types";

type Props = {
  project: Project;
  user: User;
  getProject: Function;
  updateProjectInfo: Function;
  deleteProjectFromID: Function;
  loading: boolean;
};

export const ProjectContext = React.createContext<Props>({
  project: undefined,
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  getProject: Function,
  updateProjectInfo: Function,
  deleteProjectFromID: Function,
  loading: true,
});
