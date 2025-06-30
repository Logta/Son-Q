import { Paper } from "@mui/material";
import type { Project } from "@son-q/types";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ProjectContext } from "@/contexts";
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

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  const { project, updateProjectInfo } = useContext(ProjectContext);

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pro: Project = {
      ID: "",
      name: name.value,
      content: content.value,
      creater: "",
      question_num: question_num.value,
      project_mode: "default",
      participants: [],
    };

    updateProjectInfo(pro);
    redirect("/projects")(e);
  };

  const name = useInput(project.name);
  const content = useInput(project.content);
  const question_num = useInput(project.question_num.toString());

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
