import styles from "./ProjectDialog.module.scss";
import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@material-ui/core";
import { ProjectsContext } from "@/contexts";
import { useContext } from "react";
import { Project } from "@/models";

type Props = {
  open: boolean;
  setOpen: Function;
};

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(
  initValue: string,
  validation: (t: string) => boolean,
  validationMessage: string
): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (validation(e.target.value)) {
        alert(validationMessage);
        return;
      }
      setValue(e.target.value);
    },
  };
}

const App = (props: Props) => {
  const { createProjects } = useContext(ProjectsContext);
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

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

    createProjects(pro);
    handleClose();
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: styles.dialog }}
      >
        <DialogTitle id="form-dialog-title">プログラムの作成</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent classes={{ root: styles.dialogContent }}>
            <DialogContentText>
              作成したいプログラムの情報を入力してください
            </DialogContentText>
            <Box mt={3}>
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
            </Box>
            <Box mt={3}>
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
            <Box mt={3}>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              キャンセル
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ margin: "2em" }}
            >
              作成
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export { App as ProjectCreateDialog };
