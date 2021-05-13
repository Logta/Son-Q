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
} from "@material-ui/core";
import { ProjectsContext } from "@/contexts";
import { useContext } from "react";

type Props = {
  open: boolean;
  setOpen: Function;
};

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  };
}

const App = (props: Props) => {
  const { joinProjects } = useContext(ProjectsContext);
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    joinProjects(joinID.value);
    handleClose();
  };

  const joinID = useInput("");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: styles.dialog }}
    >
      <DialogTitle id="form-dialog-title">プログラムへの参加</DialogTitle>
      <form onSubmit={handleSubmit} className={styles.form}>
        <DialogContent classes={{ root: styles.dialogContent }}>
          <DialogContentText>
            参加したいプログラムIDを入力してください
          </DialogContentText>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="プログラムID"
            fullWidth
            {...joinID}
          />
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
            参加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { App as ProjectJoinDialog };
