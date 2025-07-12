import { Chip, TableCell, TableRow } from "@son-q/ui-tailwind";
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
              className="min-h-16 py-2"
              style={{
                width: "2em",
                minWidth: "2em",
                fontWeight: "bold"
              }}
            >
              <Chip size="sm" label={`${index + 1}`} />
            </TableCell>
            <TableCell
              key={`${ques.ID}-result-questioner`}
              component="th"
              scope="row"
              align="center"
              className="min-h-16 py-2"
              style={{
                width: "10em",
                minWidth: "10em",
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
              className="min-h-16 py-2"
              style={{
                width: "5em",
                minWidth: "5em",
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
                    className="min-h-16 py-2"
                    style={{
                      width: `calc(45% / ${participants.length})`,
                      minWidth: `calc(45% / ${participants.length})`,
                      borderLeftWidth: "3px",
                      borderLeftStyle: "solid",
                      borderLeftColor: "lightGray",
                    }}
                    key={`${part.user_id}-${ques.ID}-result-mark`}
                  >
                    {getQuestioner(participants, ques) ===
                    getRespondent(part, participants, ques, answers) ? (
                      <Chip label="〇" color="secondary" variant="outline" />
                    ) : (
                      <Chip label="×" color="primary" variant="outline" />
                    )}
                  </TableCell>
                  <TableCell
                    key={`${part.user_id}-${ques.ID}-result`}
                    align="center"
                    className="min-h-16 py-2"
                    style={{
                      borderLeftWidth: "2px",
                      borderLeftStyle: "dotted",
                      borderLeftColor: "lightGray",
                      width: `calc(45% / ${participants.length})`,
                      minWidth: `calc(45% / ${participants.length})`,
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
