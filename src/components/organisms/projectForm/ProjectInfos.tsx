import { Box, Chip, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormLabel } from "@son-q/ui";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getProjectFromID } from "@son-q/api";
import { useGlobalStore } from "@/stores";
import styles from "./ProjectForm.module.scss";

const App = () => {
  const router = useRouter();
  const projectId = router.query.pid as string;
  const { user } = useGlobalStore();
  const paletteType = useTheme().palette.mode;

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
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
      <Box m={"2em"}>
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
                  color="primary"
                  variant={paletteType === "dark" ? "filled" : "outlined"}
                  style={{ marginRight: "1em" }}
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
