import styles from "./ProjectForm.module.scss";
import React from "react";
import { List, ListItem, ListItemText, Box, Chip } from "@material-ui/core";
import { ProjectContext } from "@/contexts";
import { FormLabel } from "@/components/atoms";
import { useContext } from "react";

const App = () => {
  const { project } = useContext(ProjectContext);

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
                  label={p}
                  color="primary"
                  variant="outlined"
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
