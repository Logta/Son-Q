import styles from "./ResultTable.module.scss";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { TableRow } from "./TableRow";

import { TableHeader } from "./TableHeader";

const App = () => {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHeader />
        <TableBody>
          <TableRow />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { App as ResultTable };
