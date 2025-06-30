import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import type { Project } from "@son-q/types";
import styles from "./ProjectTable.module.scss";

import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

type Props = {
  rows: Array<Project>;
};

const App = ({ rows }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHeader />
        <TableBody>
          {rows.map((row: Project) => (
            <TableRow row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { App as ProjectTable };
