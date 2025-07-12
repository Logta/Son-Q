import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getProjectFromID, updateProject } from "@son-q/api";
import type { Project } from "@son-q/types";
import { Button, FormLabel } from "@son-q/ui-tailwind";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useProjectIdFromRouter } from "@/hooks/useProjectIdFromRouter";
import { useGlobalStore } from "@/stores";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import styles from "./ProjectForm.module.scss";

type UseInputReturn = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(
  initValue: string,
  validation: (t: string) => boolean,
  validationMessage: string
): UseInputReturn {
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
  const [open, setOpen] = React.useState(false);
  const projectId = useProjectIdFromRouter();
  const { user, successMessage, errorMessage } = useGlobalStore();
  const queryClient = useQueryClient();

  const redirect = (href: string) => (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    window.location.href = href;
  };

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectFromID(projectId),
    enabled: !!user && !!projectId,
  });

  const updateProjectMutation = useMutation({
    mutationFn: async (data: Project) => {
      const result = await updateProject(projectId, data);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      if (data.variant === "success") {
        successMessage(data.message);
      } else {
        errorMessage(data.message);
      }
    },
    onError: () => {
      errorMessage("プロジェクトの更新に失敗しました");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pro: Project = {
      ID: "",
      name: name.value,
      content: content.value,
      creater: "",
      question_num: Number(question_num.value),
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
                variant="primary"
                className={`${styles.submitButton} inline-flex items-center gap-2`}
              >
                <SaveIcon />
                更新
              </Button>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className={`${styles.deleteButton} inline-flex items-center gap-2`}
              >
                <DeleteIcon />
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
