import { Table, TableBody, TableContainer } from "@son-q/ui-tailwind";
import type { Answer, Participant } from "@son-q/types";
import styles from "./ResultPointTable.module.scss";

import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

type Props = {
  participants: Participant[];
  answers?: Answer[];
  projectMode?: string;
};

const App = ({ participants, answers, projectMode }: Props) => {
  return (
    <TableContainer>
      <Table className={styles.table} aria-label="simple table">
        <TableHeader participants={participants} />
        <TableBody>
          <TableRow participants={participants} answers={answers} projectMode={projectMode} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { App as ResultPointTable };
