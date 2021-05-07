import { TableRow, TableCell, Button } from "@material-ui/core";
import { Project } from "@/models";

type Props = {
  row: Project;
};

const App = (props: Props) => {
  const { row } = props;
  return (
    <TableRow key={row.ID}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.ID}</TableCell>
      <TableCell align="right">{row.content}</TableCell>
      <TableCell align="right">{row.questionNum}</TableCell>
      <TableCell align="right">{row.participants.length}</TableCell>
      <TableCell>
        <Button variant="outlined">編集</Button>
        <Button variant="outlined">回答</Button>
        <Button variant="outlined">結果</Button>
      </TableCell>
      <TableCell>
        <Button variant="outlined" color="secondary">
          削除
        </Button>
      </TableCell>
    </TableRow>
  );
};

export { App as TableRow };
