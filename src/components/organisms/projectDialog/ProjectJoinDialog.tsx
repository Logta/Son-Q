import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useJoinProject } from "@son-q/queries";
import React from "react";
import { useProjectsStore } from "@/stores";
import styles from "./ProjectDialog.module.scss";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// カスタムフックを定義（input 要素用の属性を生成する）
// biome-ignore lint/suspicious/noExplicitAny: custom hook return type
function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
}

const App = (props: Props) => {
  const { successMessage, errorMessage } = useProjectsStore();
  const joinProjectMutation = useJoinProject();
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await joinProjectMutation.mutateAsync({
        projectId: joinID.value,
        userName: "",
      });
      if (result?.variant === "success") {
        successMessage(result.message);
        handleClose();
      } else if (result?.variant === "error") {
        errorMessage(result.message);
      }
    } catch (_error) {
      errorMessage("プロジェクトへの参加に失敗しました");
    }
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
          <DialogContentText>参加したいプログラムIDを入力してください</DialogContentText>
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
          <Button type="submit" color="primary" variant="contained" style={{ margin: "2em" }}>
            参加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { App as ProjectJoinDialog };
