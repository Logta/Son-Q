import { getProjectFromID } from "@son-q/api";
import {
  Chip,
  Container,
  FormLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@son-q/ui-tailwind";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useGlobalStore } from "@/stores";

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
      <Container maxWidth="md" className="mt-8">
        <Paper className="p-6">
          <FormLabel className="mb-4">プロジェクト情報</FormLabel>
          <List>
            <ListItem>
              <ListItemText primary="プロジェクトID" secondary={project.ID} />
            </ListItem>
            <ListItem>
              <ListItemText primary="参加者" />
            </ListItem>
            <ListItem className="flex flex-wrap gap-2">
              {getParticipants().map((p) => {
                return <Chip key={p} label={p} variant="filled" />;
              })}
            </ListItem>
          </List>
        </Paper>
      </Container>
    )
  );
};

export { App as ProjectInfos };
