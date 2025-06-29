import styles from "./ResultTable.module.scss";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TableRow } from "./TableRow";

import { TableHeader } from "./TableHeader";
import { Participant, Answer, Question } from "@/models";

type Props = {
  participants: Participant[];
  answers: Answer[];
  questions: Question[];
};

const App = ({ participants, answers, questions }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHeader participants={participants} />
        <TableBody>
          <TableRow participants={participants} answers={answers} questions={questions} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { App as ResultTable };
