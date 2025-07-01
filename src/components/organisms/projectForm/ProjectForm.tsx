import { Paper } from "@mui/material";
import type { Project } from "@son-q/types";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectFromID } from "@son-q/api";
import { useGlobalStore } from "@/stores";
import { ProjectFormContent } from "./ProjectFormContent";
import { ProjectInfos } from "./ProjectInfos";

// カスタムフックを定義（input 要素用の属性を生成する）
// biome-ignore lint/suspicious/noExplicitAny: custom hook return type
function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
}

const App = () => {
  const router = useRouter();
  const projectId = router.query.pid as string;
  const { user } = useGlobalStore();

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
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
