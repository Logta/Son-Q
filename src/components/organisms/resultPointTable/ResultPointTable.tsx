import styles from "./ResultPointTable.module.scss";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableRow } from "./TableRow";

import { TableHeader } from "./TableHeader";
import { Participant, Answer } from "@/models";

type Props = {
  participants: Participant[];
  answers?: Answer[];
  projectMode?: string;
};

const App = ({ participants, answers, projectMode }: Props) => {
  return (
    <TableContainer component={Paper}>
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
