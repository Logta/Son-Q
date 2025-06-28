import { ProjectContext, GlobalContext } from "@/contexts";
import React, { useState, useEffect, useContext } from "react";
import { isNull } from "es-toolkit";

import { Project, User } from "@/models";
import {
  awaitOnAuth,
  getProjectFromID,
  updateProject,
  deleteProject,
} from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const ProjectContainer: React.FC<Props> = ({ children, projectId }) => {
  const { errorMessage, successMessage } = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project>();
  const [user, setUser] = useState<User>({
    ID: "",
    Name: "",
    Login: false,
  });

  useEffect(() => {
    getProject();
  }, []);

  const getProject = async () => {
    const user = await awaitOnAuth();

    if (isNull(user) || !user.ok) {
      return;
    }
    const ps = await getProjectFromID(projectId);
    setProject(ps);
    setUser({
      ID: user.id,
      Name: user.name,
      Login: true,
    });
    setLoading(false);
  };

  const updateProjectInfo = async (data: Project) => {
    const { message, variant } = await updateProject(projectId, data);
    switch (variant) {
      case "success":
        successMessage(message);
        break;

      case "error":
        errorMessage(message);
        break;
    }
  };

  const deleteProjectFromID = async (id: string): Promise<boolean> => {
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

    return variant === "success";
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        user,
        getProject,
        updateProjectInfo,
        deleteProjectFromID,
        loading,
      }}
    >
      {project && children}
    </ProjectContext.Provider>
  );
};

export { ProjectContainer };
