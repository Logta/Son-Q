import styles from "./ProjectForm.module.scss";
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { ProjectContext } from "@/contexts";
import { useContext } from "react";
import { useRouter } from "next/router";

type Props = {
  open: boolean;
  setOpen: Function;
};

const App = (props: Props) => {
  const { open, setOpen } = props;
  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  const { project, deleteProjectFromID } = useContext(ProjectContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await deleteProjectFromID(project.ID);
    if (result) redirect("/projects")(e);
  };

  return (
    project && (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"プロジェクトを削除"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            選択したプロジェクト
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            <strong>{project.name}</strong>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            を削除します <br />
            ※削除したプロジェクトを復元することはできません
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            color="secondary"
            autoFocus
            variant="contained"
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export { App as DeleteConfirmDialog };
