import { Table, TableBody, TableContainer, TableHeader } from "@son-q/ui-tailwind";
import type { Answer, Participant, Question } from "@son-q/types";
import { TableHeader as TableHeaderRows } from "./TableHeader";
import { TableRow } from "./TableRow";
import styles from "./ResultTable.module.scss";

type Props = {
  participants: Participant[];
  answers: Answer[];
  questions: Question[];
};

const App = ({ participants, answers, questions }: Props) => {
  return (
    <div className="mx-4">
      <TableContainer className="w-full">
        <Table className={`${styles.table} w-full`} aria-label="simple table">
          <TableHeader>
            <TableHeaderRows participants={participants} />
          </TableHeader>
          <TableBody>
            <TableRow participants={participants} answers={answers} questions={questions} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { App as ResultTable };
