import { ProjectsContext, GlobalContext } from "@/contexts";
import React, { useState, useEffect, useContext } from "react";
import { isNull } from "es-toolkit";

import { Project, User } from "@/models";
import {
  awaitOnAuth,
  getProject,
  createProject,
  deleteProject,
  joinProject,
} from "@/firebase";

const ProjectsContainer: React.FC = ({ children }) => {
  const { errorMessage, successMessage, warningMessage } =
    useContext(GlobalContext);
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
    console.log("done?");
    if (isNull(user) || !user.ok) {
      setProjects([]);
      return;
    }
    console.log("done");
    const ps = await getProject(user);
    console.log(ps);

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
    if (isNull(user) || !user.ok) return;

    const { message, variant } = await createProject(user, data);
    switch (variant) {
      case "success":
        successMessage(message);
        break;

      case "error":
        errorMessage(message);
        break;
    }
    await getProjects();
  };

  const updateProjects = async () => {
    setProjects([]);
  };

  const deleteProjects = async (id: string) => {
    const user = await awaitOnAuth();
    if (isNull(user) || !user.ok) return;

    const { message, variant } = await deleteProject(id);
    switch (variant) {
      case "success":
        successMessage(message);
        break;

      case "error":
        errorMessage(message);
        break;
    }
    await getProjects();
  };

  ///プロジェクトに参加する
  const joinProjects = async (id: string) => {
    const user = await awaitOnAuth();
    if (isNull(user) || !user.ok) return;

    const { message, variant } = await joinProject(user, id);
    switch (variant) {
      case "success":
        successMessage(message);
        break;

      case "error":
        errorMessage(message);
        break;

      case "warningMessage":
        alert(message);
        console.log("test");
        warningMessage(message);
        break;
    }
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
