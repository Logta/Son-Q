import { Box, Chip, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormLabel } from "@son-q/ui";
import { useContext } from "react";
import { ProjectContext } from "@/contexts";
import styles from "./ProjectForm.module.scss";

const App = () => {
  const { project } = useContext(ProjectContext);
  const paletteType = useTheme().palette.mode;

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
                  variant={paletteType === "dark" ? "default" : "outlined"}
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
