import { ProjectContext } from "@/contexts";
import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Project, User } from "@/models";
import { awaitOnAuth, getProjectFromID, updateProject } from "@/firebase";

type Props = {
  children: React.ReactNode;
  projectId: string;
};

const ProjectContainer: React.FC<Props> = ({ children, projectId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project>({
    ID: "",
    name: "",
    content: "",
    creater: "",
    question_num: 0,
    participants: [],
  });
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

    if (_.isNull(user) || !user.ok) {
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
    updateProject(projectId, data);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        user,
        getProject,
        updateProjectInfo,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContainer };
