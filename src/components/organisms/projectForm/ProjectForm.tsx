import styles from "./ProjectTable.module.scss";
import React from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import { ProjectContext } from "@/contexts";
import { useContext } from "react";
import { Project } from "@/models";

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
  };

  const name = useInput(project.name);
  const content = useInput(project.content);
  const question_num = useInput(project.question_num.toString());

  return (
    project && (
      <Paper>
        プログラムの編集
        <form onSubmit={handleSubmit}>
          プログラムの情報を確認・編集してください
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
          <Button onClick={() => {}} color="primary">
            キャンセル
          </Button>
          <Button type="submit" color="primary">
            更新
          </Button>
        </form>
      </Paper>
    )
  );
};

export { App as ProjectForm };
