import type { Project } from "@son-q/types";
import { Paper, Table, TableBody, TableContainer, TableHeader } from "@son-q/ui-tailwind";
import styles from "./ProjectTable.module.scss";
import { TableHeader as TableHeaderRow } from "./TableHeader";
import { TableRow } from "./TableRow";

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
