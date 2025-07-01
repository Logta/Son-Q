import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";
import type React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProjectFromID } from "@son-q/api";
import { useGlobalStore } from "@/stores";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const App = (props: Props) => {
  const { open, setOpen } = props;
  const router = useRouter();
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

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteProject(id);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      if (data.variant === 'success') {
        successMessage(data.message);
      } else {
        errorMessage(data.message);
      }
    },
    onError: () => {
      errorMessage('プロジェクトの削除に失敗しました');
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project) return;
    
    const result = await deleteProjectMutation.mutateAsync(project.ID);
    if (result.variant === 'success') {
      redirect("/projects")(e);
    }
  };

  return (
    project && (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"プロジェクトを削除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">選択したプロジェクト</DialogContentText>
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
          <Button onClick={handleSubmit} color="secondary" autoFocus variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export { App as DeleteConfirmDialog };
