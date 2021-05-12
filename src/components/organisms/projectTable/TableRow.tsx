import { TableRow, TableCell, Button } from "@material-ui/core";
import { Project, User } from "@/models";
import { ProjectsContext } from "@/contexts";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./ProjectTable.module.scss";

type Props = {
  row: Project;
};

const App = (props: Props) => {
  const router = useRouter();

  const redirect =
    (href: string) => (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      router.push(href);
      event.stopPropagation();
    };

  const handleClickRow =
    (href: string, authority: boolean) =>
    (event: React.MouseEvent<HTMLTableRowElement>) => {
      event.preventDefault();
      authority && router.push(href);
    };

  const getAuthority = (row: Project, user: User) => {
    return row.creater === user.ID;
  };

  const { row } = props;
  const { deleteProjects, user } = useContext(ProjectsContext);
  return (
    <TableRow
      key={row.ID}
      onClick={handleClickRow(`/projects/${row.ID}`, getAuthority(row, user))}
      className={getAuthority(row, user) && styles.hovorRow}
    >
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
