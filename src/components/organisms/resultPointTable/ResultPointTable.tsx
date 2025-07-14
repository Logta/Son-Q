import type { Answer, Participant } from "@son-q/types";
import { Table, TableBody, TableContainer, TableHeader } from "@son-q/ui-tailwind";
import styles from "./ResultPointTable.module.scss";
import { TableHeader as TableHeaderRow } from "./TableHeader";
import { TableRow } from "./TableRow";

type Props = {
  participants: Participant[];
  answers?: Answer[];
  projectMode?: string;
};

const App = ({ participants, answers, projectMode }: Props) => {
  return (
    <div className="mx-4">
      <TableContainer className="w-full">
        <Table className={`${styles.table} w-full`} aria-label="simple table">
          <TableHeader>
            <TableHeaderRow participants={participants} />
          </TableHeader>
          <TableBody>
            <TableRow participants={participants} answers={answers} projectMode={projectMode} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export { App as ResultPointTable };
