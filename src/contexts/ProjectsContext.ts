import React from "react";
import { Project } from "@/models";

type Props = {
  projects: Array<Project>;
  getProjects: Function;
  createProjects: Function;
  updateProjects: Function;
  deleteProjects: Function;
  joinProjects: Function;
  loading: boolean;
};

export const ProjectsContext = React.createContext<Props>({
  projects: [],
  getProjects: Function,
  createProjects: Function,
  updateProjects: Function,
  deleteProjects: Function,
  joinProjects: Function,
  loading: true,
});
