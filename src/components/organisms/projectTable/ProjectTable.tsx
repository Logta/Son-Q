import styles from "./ProjectTable.module.scss";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableRow } from "./TableRow";

import { TableHeader } from "./TableHeader";
import { Project } from "@/models";

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
