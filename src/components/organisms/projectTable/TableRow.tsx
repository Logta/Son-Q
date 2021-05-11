import { TableRow, TableCell, Button } from "@material-ui/core";
import { Project } from "@/models";
import { ProjectsContext } from "@/contexts";
import { useContext } from "react";
import { useRouter } from "next/router";

type Props = {
  row: Project;
};

const App = (props: Props) => {
  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const { row } = props;
  const { deleteProjects, user } = useContext(ProjectsContext);
  return (
    <TableRow key={row.ID}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="center">{row.ID}</TableCell>
      <TableCell align="center">{row.content}</TableCell>
      <TableCell align="center">{row.question_num}</TableCell>
      <TableCell align="center">{row.participants.length}</TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={redirect(`/questions/${row.ID}`)}>
          問題設定
        </Button>
        <Button
          variant="contained"
          onClick={redirect(`/answers/${row.ID}`)}
          style={{ marginLeft: "1em" }}
        >
          回答
        </Button>
        <Button
          variant="contained"
          onClick={redirect(`/results/${row.ID}`)}
          style={{ marginLeft: "1em" }}
        >
          結果
        </Button>
      </TableCell>
      <TableCell align="center">
        {row.creater === user.ID && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deleteProjects(row.ID)}
          >
            削除
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export { App as TableRow };
