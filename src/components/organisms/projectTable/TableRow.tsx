import { TableRow, TableCell, Button } from "@material-ui/core";
import { Project, User } from "@/models";
import { ProjectsContext, GlobalContext } from "@/contexts";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./ProjectTable.module.scss";

import { getExistQuestionNum, getExistAnswerNum } from "@/firebase";

type Props = {
  row: Project;
};

const App = (props: Props) => {
  const router = useRouter();
  const [readyQuestion, setReadyQuestion] = useState<boolean>(false);
  const [readyResult, setReadyResult] = useState<boolean>(false);

  const { row } = props;
  const { deleteProjects, user } = useContext(ProjectsContext);
  const { darkMode } = useContext(GlobalContext);

  useEffect(() => {
    getReadyQuesion();
    getReadyResult();
  }, []);

  const getReadyQuesion = async () => {
    const q_num = await getExistQuestionNum(row.ID);
    const full_q = row.participants.length * row.question_num;
    console.log(`q_num : ${q_num}`);
    console.log(`full_q : ${full_q}`);
    setReadyQuestion(full_q === q_num);
  };

  const getReadyResult = async () => {
    const a_num = await getExistAnswerNum(row.ID);
    const full_a = row.participants.length ** 2 * row.question_num;
    console.log(`a_num : ${a_num}`);
    console.log(`full_a : ${full_a}`);
    setReadyResult(full_a === a_num);
  };

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

  return (
    <TableRow
      key={row.ID}
      onClick={handleClickRow(`/projects/${row.ID}`, getAuthority(row, user))}
      className={
        getAuthority(row, user) &&
        (!darkMode ? styles.lightHovorRow : styles.darkHovorRow)
      }
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
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
          disabled={!readyQuestion}
        >
          回答
        </Button>
        <Button
          variant="contained"
          onClick={redirect(`/results/${row.ID}`)}
          style={{ marginLeft: "1em" }}
          disabled={!readyResult}
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
