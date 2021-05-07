import { TableRow, TableCell, Button } from "@material-ui/core";
import { Project } from "@/models";
import { ProjectsContext } from "@/contexts";
import { useContext } from "react";

type Props = {
  row: Project;
};

const App = (props: Props) => {
  const { row } = props;
  const { deleteProjects } = useContext(ProjectsContext);
  return (
    <TableRow key={row.ID}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="center">{row.ID}</TableCell>
      <TableCell align="center">{row.content}</TableCell>
      <TableCell align="center">{row.questionNum}</TableCell>
      <TableCell align="center">{row.participants.length}</TableCell>
      <TableCell>
        <Button variant="outlined">編集</Button>
        <Button variant="outlined">回答</Button>
        <Button variant="outlined">結果</Button>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => deleteProjects(row.ID)}
        >
          削除
        </Button>
      </TableCell>
    </TableRow>
  );
};

export { App as TableRow };
