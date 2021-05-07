import { ProjectsContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Project } from "@/models";
import { awaitOnAuth } from "@/firebase";

const ProjectsContainer: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const user = await awaitOnAuth();
    setLoading(false);
    if (_.isNull(user) || !user.ok) {
      setProjects([]);
      return;
    }
  };

  const createProjects = async () => {
    setProjects([]);
  };

  const updateProjects = async () => {
    setProjects([]);
  };

  const deleteProjects = async () => {
    setProjects([]);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        getProjects,
        createProjects,
        updateProjects,
        deleteProjects,
        loading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsContainer };
