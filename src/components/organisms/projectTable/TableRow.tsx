import { getExistAnswerNum, getExistQuestionNum } from "@son-q/api";
import type { Project, User } from "@son-q/types";
import { Button, Chip, PopupButton, TableCell, TableRow } from "@son-q/ui-tailwind";
import { BarChart3, Edit3, Vote } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGlobalStore, useProjectsStore } from "@/stores";
import styles from "./ProjectTable.module.scss";

type Props = {
  row: Project;
};

const App = (props: Props) => {
  const router = useRouter();
  const [readyQuestion, setReadyQuestion] = useState<boolean>(false);
  const [readyResult, setReadyResult] = useState<boolean>(false);

  const { row } = props;
  const { user } = useProjectsStore();
  const { darkMode } = useGlobalStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialization only
  useEffect(() => {
    getReadyQuesion();
    getReadyResult();
  }, []);

  const getReadyQuesion = async () => {
    const q_num = await getExistQuestionNum(row.ID);
    const full_q = row.participants.length * row.question_num;
    setReadyQuestion(full_q === q_num);
  };

  const getReadyResult = async () => {
    const a_num = await getExistAnswerNum(row.ID);
    const full_a = row.participants.length ** 2 * row.question_num;
    setReadyResult(full_a === a_num);
  };

  const redirect = (href: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(href);
    event.stopPropagation();
  };

  const handleClickRow =
    (href: string, authority: boolean) => (event: React.MouseEvent<HTMLTableRowElement>) => {
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
        getAuthority(row, user) && (!darkMode ? styles.lightHovorRow : styles.darkHovorRow)
      }
    >
      <TableCell component="th" scope="row" className="w-48">
        <Chip variant="default">{row.name}</Chip>
      </TableCell>
      <TableCell align="center">{row.content}</TableCell>
      <TableCell align="center" className="w-32">
        <Chip size="sm">{row.question_num}</Chip>
      </TableCell>
      <TableCell align="center" className="w-32">
        <Chip size="sm">{row.participants.length}</Chip>
      </TableCell>
      <TableCell align="center" className="w-36">
        <Button variant="primary" onClick={redirect(`/questions/${row.ID}`)}>
          <Edit3 className="mr-2" />
          出題
        </Button>
      </TableCell>
      <TableCell align="center" className="w-36">
        <PopupButton
          onClick={redirect(`/answers/${row.ID}`)}
          disabled={!readyQuestion}
          popup={"参加者全員分の問題設定が完了していません"}
          popupDisable={readyQuestion}
          startIcon={<Vote />}
        >
          回答
        </PopupButton>
      </TableCell>
      <TableCell align="center" className="w-36">
        <PopupButton
          onClick={redirect(`/results/${row.ID}`)}
          disabled={!readyResult}
          popup={"参加者全員分の回答が完了していません"}
          popupDisable={readyResult}
          startIcon={<BarChart3 />}
        >
          結果
        </PopupButton>
      </TableCell>
    </TableRow>
  );
};

export { App as TableRow };
