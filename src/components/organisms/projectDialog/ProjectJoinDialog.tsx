import styles from "./ProjectTable.module.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

type Props = {
  open: boolean;
  setOpen: Function;
};

const App = (props: Props) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">プログラムへの参加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            参加したいプログラムIDを入力してください
          </DialogContentText>
          <TextField
            variant="outlined"
            autoFocus
            margin="dense"
            id="name"
            label="プログラムID"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleClose} color="primary">
            参加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { App as ProjectJoinDialog };
