import { TableRow, TableCell, Chip } from "@material-ui/core";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";
import { Answer, Participant, Question } from "@/models";
import _ from "lodash";

const App = () => {
  const { participants, answers, questions } = useContext(ResultsContext);
  return (
    <>
      {questions.map((ques) => {
        return (
          <TableRow key={`${ques.ID}-result`}>
            <TableCell
              key={`${ques.ID}-result-partName`}
              component="th"
              scope="row"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              {getQuestioner(participants, ques)}
            </TableCell>
            {participants.map((part) => {
              return (
                <>
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
                </>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

const getQuestioner = (
  participants: Array<Participant>,
  ques: Question
): string => {
  return participants.find((p) => p.user_id === ques.select_user_id).user_name;
};

const getRespondent = (
  ansUser: Participant,
  participants: Array<Participant>,

  ques: Question,
  answers: Array<Answer>
): string => {
  const ans: Answer = answers.find(
    (a) =>
      a.answer_user_id === ansUser.user_id &&
      ques.url === a.url &&
      ques.select_user_id === a.select_user_id
  );
  if (_.isNil(ans)) return "";
  return participants.find((p) => p.user_id === ans.guess_user_id).user_name;
};

export { App as TableRow };
