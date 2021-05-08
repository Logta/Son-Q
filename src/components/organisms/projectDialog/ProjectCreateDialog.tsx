import styles from "./ProjectTable.module.scss";
import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { ProjectsContext } from "@/contexts";
import { useContext } from "react";
import { Project } from "@/models";

type Props = {
  open: boolean;
  setOpen: Function;
}; // カスタムフックを定義（input 要素用の属性を生成する）

function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
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
      questionNum: questionNum.value,
      participants: [],
    };

    createProjects(pro);
    handleClose();
  };

  const name = useInput("");
  const content = useInput("");
  const questionNum = useInput("");

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">プログラムの作成</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              作成したいプログラムの情報を入力してください
            </DialogContentText>
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
              id="questionNum"
              label="出題数"
              type="number"
              required
              fullWidth
              {...questionNum}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button type="submit" color="primary">
              作成
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export { App as ProjectCreateDialog };
