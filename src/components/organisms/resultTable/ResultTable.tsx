import { Table, TableBody, TableContainer, TableHeader } from "@son-q/ui-tailwind";
import type { Answer, Participant, Question } from "@son-q/types";
import styles from "./ResultTable.module.scss";

import { TableHeader as TableHeaderRows } from "./TableHeader";
import { TableRow } from "./TableRow";

type Props = {
  participants: Participant[];
  answers: Answer[];
  questions: Question[];
};

const App = ({ participants, answers, questions }: Props) => {
  return (
    <TableContainer>
      <Table className={styles.table} aria-label="simple table">
        <TableHeader>
          <TableHeaderRows participants={participants} />
        </TableHeader>
        <TableBody>
          <TableRow participants={participants} answers={answers} questions={questions} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { App as ResultTable };
