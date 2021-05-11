import { TableRow, TableCell } from "@material-ui/core";
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
          <TableRow key={"result-point"}>
            <TableCell component="th" scope="row">
              {getQuestioner(participants, ques)}
            </TableCell>
            {participants.map((part) => {
              return (
                <TableCell align="center">
                  {getRespondent(part, participants, ques, answers)}
                </TableCell>
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
  participant: Participant,
  participants: Array<Participant>,

  ques: Question,
  answers: Array<Answer>
): string => {
  const ans: Answer = answers.find(
    (a) => a.answer_user_id === participant.user_id && ques.url === a.url
  );
  if (_.isNil(ans)) return "";
  return participants.find((p) => p.user_id === ans.guess_user_id).user_name;
};

const getCorrectPoint = (userID: string, answers: Array<Answer>): string => {
  console.log(userID);
  return answers
    .filter(
      (ans) =>
        ans.answer_user_id === userID &&
        ans.guess_user_id === ans.select_user_id
    )
    .length.toString();
};
export { App as TableRow };
