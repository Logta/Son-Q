import React from "react";
import { Project, User } from "@/models";

type Props = {
  project: Project;
  user: User;
  getProject: Function;
  updateProjectInfo: Function;
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
  loading: true,
});
