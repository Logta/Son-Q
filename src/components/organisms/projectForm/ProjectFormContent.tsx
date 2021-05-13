import styles from "./ProjectForm.module.scss";
import React from "react";
import { Button, TextField, Box } from "@material-ui/core";
import { ProjectContext } from "@/contexts";
import { useContext } from "react";
import { Project } from "@/models";
import { useRouter } from "next/router";
import { FormLabel } from "@/components/atoms";

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
      <>
        <FormLabel>プロジェクト編集</FormLabel>
        <div className={styles.textForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="name"
              label="プロジェクト名"
              required
              fullWidth
              {...name}
            />
            <Box marginTop={3} width={"100%"}>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="content"
                label="内容"
                required
                fullWidth
                {...content}
              />
            </Box>
            <Box marginTop={3} width={"100%"}>
              <TextField
                variant="outlined"
                autoFocus
                margin="dense"
                id="question_num"
                label="出題数"
                type="number"
                required
                fullWidth
                {...question_num}
              />
            </Box>
            <div className={styles.button}>
              <Button onClick={redirect("/projects/")} color="secondary">
                キャンセル
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginLeft: "2em" }}
              >
                更新
              </Button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export { App as ProjectFormContent };
