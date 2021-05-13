import styles from "./ProjectForm.module.scss";
import React from "react";
import { Button, TextField, Paper, Box } from "@material-ui/core";
import { ProjectContext } from "@/contexts";
import { useContext } from "react";
import { Project } from "@/models";
import { useRouter } from "next/router";
import { ProjectInfos } from "./ProjectInfos";
import { ProjectFormContent } from "./ProjectFormContent";

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  };
}

const App = () => {
  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  const { project, updateProjectInfo } = useContext(ProjectContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pro: Project = {
      ID: "",
      name: name.value,
      content: content.value,
      creater: "",
      question_num: question_num.value,
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
