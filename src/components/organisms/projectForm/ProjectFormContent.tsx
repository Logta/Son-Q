import styles from "./ProjectForm.module.scss";
import React from "react";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ProjectContext, GlobalContext } from "@/contexts";
import { useContext } from "react";
import { Project } from "@/models";
import { useRouter } from "next/router";
import { FormLabel } from "@/components/atoms";

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(
  initValue: string,
  validation: (t: string) => boolean,
  validationMessage: string
): any {
  const { errorMessage } = useContext(GlobalContext);
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (validation(e.target.value)) {
        errorMessage(validationMessage);
        return;
      }
      setValue(e.target.value);
    },
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
      project_mode: project_mode.value,
      participants: [],
    };

    updateProjectInfo(pro);
    redirect("/projects")(e);
  };

  const name = useInput(
    project.name,
    (t: string): boolean => {
      return t.length > 10;
    },
    "10文字以下で入力してください"
  );
  const content = useInput(
    project.content,
    (t: string): boolean => {
      return t.length > 30;
    },
    "30文字以下で入力してください"
  );
  const question_num = useInput(
    project.question_num.toString(),
    (t: string): boolean => {
      return +t <= 0;
    },
    "1以上の数値を入力してください"
  );
  const project_mode = useInput(
    project.project_mode,
    (_: string): boolean => {
      return false;
    },
    ""
  );

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
            <Box marginTop={3} width={"100%"}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  ポイント計算モード
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  {...project_mode}
                  label="ポイント計算モード"
                >
                  <MenuItem value={"normal"}>正解数が得点に</MenuItem>
                  <MenuItem value={"getOnlyOneCorrectAnswer"}>
                    1人だけが正解するように
                  </MenuItem>
                  <MenuItem value={"getOnlyOneIncorrectAnswer"}>
                    1人だけが不正解するように
                  </MenuItem>
                </Select>
              </FormControl>
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
