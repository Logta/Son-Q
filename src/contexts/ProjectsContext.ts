import React from "react";
import { Project, User } from "@/models";

type Props = {
  projects: Array<Project>;
  user: User;
  getProjects: Function;
  createProjects: Function;
  updateProjects: Function;
  deleteProjects: Function;
  joinProjects: Function;
  loading: boolean;
};

export const ProjectsContext = React.createContext<Props>({
  projects: [],
  user: {
    ID: "",
    Name: "",
    Login: false,
  },
  getProjects: Function,
  createProjects: Function,
  updateProjects: Function,
  deleteProjects: Function,
  joinProjects: Function,
  loading: true,
});
