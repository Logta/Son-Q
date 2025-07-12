import { Box, Chip, List, ListItem, ListItemText } from "@son-q/ui-tailwind";
import { getProjectFromID } from "@son-q/api";
import { FormLabel } from "@son-q/ui-tailwind";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores";
import styles from "./ProjectForm.module.scss";

const App = () => {
  const router = useRouter();
  const projectId = router.query.project_id as string;
  const { user } = useGlobalStore();
  // Note: Dark mode detection can be handled via CSS classes or other means

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectFromID(projectId),
    enabled: !!user && !!projectId,
  });

  const getParticipants = (): string[] => {
    return project.participants.map((p) => {
      return p.user_name;
    });
  };

  return (
    project && (
      <Box className="m-8">
        <FormLabel>プロジェクト情報</FormLabel>
        <List className={styles.list}>
          <ListItem>
            <ListItemText primary="プロジェクトID" secondary={project.ID} />
          </ListItem>
          <ListItem>
            <ListItemText primary="参加者" />
          </ListItem>
          <ListItem>
            {getParticipants().map((p) => {
              return (
                <Chip
                  key={p}
                  label={p}
                  variant="filled"
                  className="mr-4"
                />
              );
            })}
          </ListItem>
        </List>
      </Box>
    )
  );
};

export { App as ProjectInfos };
