import { Chip, TableCell, TableRow } from "@mui/material";
import type { Answer, Participant, Question } from "@son-q/types";
import { YoutubeAnswer } from "@son-q/ui-tailwind";
import { getQuestioner, getRespondent } from "@son-q/utils";
import React from "react";

type Props = {
  participants: Participant[];
  answers: Answer[];
  questions: Question[];
  darkMode?: boolean;
};

const App = ({ participants, answers, questions, darkMode: _darkMode = false }: Props) => {
  return (
    <>
      {questions.map((ques, index) => {
        return (
          <TableRow key={`${ques.ID}-result`}>
            <TableCell
              key={`${ques.ID}-result-number`}
              component="th"
              scope="row"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              <Chip size="small" label={<strong>{index + 1}</strong>} />
            </TableCell>
            <TableCell
              key={`${ques.ID}-result-questioner`}
              component="th"
              scope="row"
              align="center"
              style={{
                fontWeight: "bold",
                borderLeftWidth: "1px",
                borderLeftStyle: "solid",
                borderLeftColor: "lightGray",
              }}
            >
              {getQuestioner(participants, ques)}
            </TableCell>
            <TableCell
              key={`${ques.ID}-result-partName-youtube`}
              component="th"
              scope="row"
              align="center"
              style={{
                borderLeftWidth: "2px",
                borderLeftStyle: "dotted",
                borderLeftColor: "lightGray",
              }}
            >
              <YoutubeAnswer id={ques.url} />
            </TableCell>
            {participants.map((part) => {
              return (
                <React.Fragment key={`${part.user_id}-${ques.ID}-fragment`}>
                  <TableCell
                    align="center"
                    style={{
                      width: "5em",
                      minWidth: "5em",
                      borderLeftWidth: "3px",
                      borderLeftStyle: "solid",
                      borderLeftColor: "lightGray",
                    }}
                    key={`${part.user_id}-${ques.ID}-result-mark`}
                  >
                    {getQuestioner(participants, ques) ===
                    getRespondent(part, participants, ques, answers) ? (
                      <Chip label="〇" color="secondary" variant="outlined" />
                    ) : (
                      <Chip label="×" color="primary" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell
                    key={`${part.user_id}-${ques.ID}-result`}
                    align="center"
                    style={{
                      borderLeftWidth: "2px",
                      borderLeftStyle: "dotted",
                      borderLeftColor: "lightGray",
                      width: `calc(90% / ${participants.length})`,
                    }}
                  >
                    {getRespondent(part, participants, ques, answers)}
                  </TableCell>
                </React.Fragment>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export { App as TableRow };
