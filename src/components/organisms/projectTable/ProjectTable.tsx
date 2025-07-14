import { Paper, Table, TableBody, TableContainer, TableHeader } from "@son-q/ui-tailwind";
import type { Project } from "@son-q/types";
import { TableHeader as TableHeaderRow } from "./TableHeader";
import { TableRow } from "./TableRow";
import styles from "./ProjectTable.module.scss";

type Props = {
  rows: Array<Project>;
};

const App = ({ rows }: Props) => {
  return (
    <Paper className="w-full mx-4">
      <TableContainer className="w-full">
        <Table className={`${styles.table} w-full`} aria-label="simple table">
          <TableHeader>
            <TableHeaderRow />
          </TableHeader>
          <TableBody>
            {rows.map((row: Project) => (
              <TableRow key={row.ID} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export { App as ProjectTable };
