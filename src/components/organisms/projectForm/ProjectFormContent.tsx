import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { Project } from "@son-q/types";
import { FormLabel } from "@son-q/ui";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectFromID, updateProject } from "@son-q/api";
import { useGlobalStore } from "@/stores";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import styles from "./ProjectForm.module.scss";

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(
  initValue: string,
  validation: (t: string) => boolean,
  validationMessage: string
  // biome-ignore lint/suspicious/noExplicitAny: custom hook return type
): any {
  const { errorMessage } = useGlobalStore();
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
  const [open, setOpen] = React.useState(false);
  const projectId = router.query.pid as string;
  const { user, successMessage, errorMessage } = useGlobalStore();
  const queryClient = useQueryClient();

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectFromID(projectId),
    enabled: !!user && !!projectId,
  });

  const updateProjectMutation = useMutation({
    mutationFn: async (data: Project) => {
      const result = await updateProject(projectId, data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      if (data.variant === 'success') {
        successMessage(data.message);
      } else {
        errorMessage(data.message);
      }
    },
    onError: () => {
      errorMessage('プロジェクトの更新に失敗しました');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
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

    await updateProjectMutation.mutateAsync(pro);
    redirect("/projects")(e);
  };

  const name = useInput(
    project?.name || "",
    (t: string): boolean => {
      return t.length > 10;
    },
    "10文字以下で入力してください"
  );
  const content = useInput(
    project?.content || "",
    (t: string): boolean => {
      return t.length > 30;
    },
    "30文字以下で入力してください"
  );
  const question_num = useInput(
    project?.question_num.toString() || "0",
    (t: string): boolean => {
      return +t <= 0;
    },
    "1以上の数値を入力してください"
  );
  const project_mode = useInput(
    project?.project_mode || "normal",
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
                <InputLabel id="demo-simple-select-outlined-label">ポイント計算モード</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  {...project_mode}
                  label="ポイント計算モード"
                >
                  <MenuItem value={"normal"}>正解数が得点に</MenuItem>
                  <MenuItem value={"getOnlyOneCorrectAnswer"}>1人だけが正解するように</MenuItem>
                  <MenuItem value={"getOnlyOneIncorrectAnswer"}>1人だけが不正解するように</MenuItem>
                  <MenuItem value={"getCorrectAnswer"}>当ててもらった問題数が得点に</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box my={2} display="flex" justifyContent="center" gap={2}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={styles.submitButton}
                startIcon={<SaveIcon />}
              >
                更新
              </Button>
              <Button
                onClick={() => setOpen(true)}
                color="secondary"
                className={styles.deleteButton}
                startIcon={<DeleteIcon />}
                variant="outlined"
              >
                プロジェクトの削除
              </Button>
            </Box>
          </form>
        </div>
        <DeleteConfirmDialog open={open} setOpen={setOpen} />
      </>
    )
  );
};

export { App as ProjectFormContent };
