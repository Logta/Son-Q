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

type Props = {
  open: boolean;
  setOpen: Function;
};

const App = (props: Props) => {
  const { createProjects } = useContext(ProjectsContext);
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async (data: any) => {
    console.log(data);
    await createProjects(data);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">プログラムの作成</DialogTitle>
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
          />
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="content"
            label="内容"
            required
            fullWidth
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={submit} color="primary">
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { App as ProjectCreateDialog };
