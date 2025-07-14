import { useCreateProject } from "@son-q/queries";
import type { Project } from "@son-q/types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@son-q/ui-tailwind";
import React from "react";
import { useProjectsStore } from "@/stores";
import styles from "./ProjectDialog.module.scss";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(
  initValue: string,
  validation: (t: string) => boolean,
  validationMessage: string
  // biome-ignore lint/suspicious/noExplicitAny: custom hook return type
): any {
  const [value, setValue] = React.useState<string>(initValue);
  const { errorMessage } = useProjectsStore();
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

/**
 * ProjectCreateDialog: TanStack Queryフックを直接使用
 */
const App = (props: Props) => {
  const { successMessage, errorMessage } = useProjectsStore();
  const { open, setOpen } = props;

  // TanStack Queryフックを直接使用
  const createProjectMutation = useCreateProject();

  const handleClose = () => {
    setOpen(false);
  };

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

    try {
      const result = await createProjectMutation.mutateAsync(pro);
      if (result?.variant === "success") {
        successMessage(result.message);
        handleClose();
      } else if (result?.variant === "error") {
        errorMessage(result.message);
      }
    } catch (_error) {
      errorMessage("プロジェクトの作成に失敗しました");
    }
  };

  const name = useInput(
    "",
    (t: string): boolean => {
      return t.length > 10;
    },
    "10文字以下で入力してください"
  );
  const content = useInput(
    "",
    (t: string): boolean => {
      return t.length > 30;
    },
    "30文字以下で入力してください"
  );
  const question_num = useInput(
    "",
    (t: string): boolean => {
      return +t <= 0;
    },
    "1以上の数値を入力してください"
  );
  const project_mode = useInput(
    "normal",
    (_: string): boolean => {
      return false;
    },
    ""
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={styles.dialog}
      >
        <DialogTitle id="form-dialog-title">プログラムの作成</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className={styles.dialogContent}>
            <DialogContentText>作成したいプログラムの情報を入力してください</DialogContentText>
            <Box className="mt-3">
              <TextField
                variant="outlined"
                autoFocus
                id="name"
                label="プロジェクト名"
                required
                fullWidth
                {...name}
              />
            </Box>
            <Box className="mt-3">
              <TextField
                variant="outlined"
                autoFocus
                id="content"
                label="内容"
                required
                fullWidth
                {...content}
              />
            </Box>
            <Box className="mt-3">
              <TextField
                variant="outlined"
                autoFocus
                id="question_num"
                label="出題数"
                type="number"
                required
                fullWidth
                {...question_num}
              />
            </Box>
            <Box className="mt-3">
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">ポイント計算モード</InputLabel>
                <Select id="demo-simple-select-outlined" {...project_mode}>
                  <MenuItem value={"normal"}>正解数が得点に</MenuItem>
                  <MenuItem value={"getOnlyOneCorrectAnswer"}>1人だけが正解するように</MenuItem>
                  <MenuItem value={"getOnlyOneIncorrectAnswer"}>1人だけが不正解するように</MenuItem>
                  <MenuItem value={"getCorrectAnswer"}>当ててもらった問題数が得点に</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="ghost">
              キャンセル
            </Button>
            <Button type="submit" variant="primary" className="m-8">
              作成
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export { App as ProjectCreateDialog };
