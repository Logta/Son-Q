import { ProjectsContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Project, User } from "@/models";
import {
  awaitOnAuth,
  getProject,
  createProject,
  deleteProject,
  joinProject,
} from "@/firebase";

const ProjectsContainer: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const user = await awaitOnAuth();

    if (_.isNull(user) || !user.ok) {
      setProjects([]);
      return;
    }
    const ps = await getProject(user);
    setProjects(ps);
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
    setLoading(false);
  };

  const createProjects = async (data: Project) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await createProject(user, data);
    await getProjects();
  };

  const updateProjects = async () => {
    setProjects([]);
  };

  const deleteProjects = async (id: string) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await deleteProject(id);
    await getProjects();
  };

  ///プロジェクトに参加する
  const joinProjects = async (id: string) => {
    const user = await awaitOnAuth();
    if (_.isNull(user) || !user.ok) return;

    await joinProject(user, id);
    await getProjects();
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        user,
        getProjects,
        createProjects,
        updateProjects,
        deleteProjects,
        joinProjects,
        loading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContainer };
