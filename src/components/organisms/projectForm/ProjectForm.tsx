import { Paper } from "@mui/material";
import { getProjectFromID } from "@son-q/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores";
import { ProjectFormContent } from "./ProjectFormContent";
import { ProjectInfos } from "./ProjectInfos";

const App = () => {
  const router = useRouter();
  const projectId = router.query.project_id as string;
  const { user } = useGlobalStore();

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectFromID(projectId),
    enabled: !!user && !!projectId,
  });

  return (
    project && (
      <Paper>
        <ProjectInfos />
        <ProjectFormContent />
      </Paper>
    )
  );
};

export { App as ProjectForm };
