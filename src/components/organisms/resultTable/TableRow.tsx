import { TableRow, TableCell } from "@material-ui/core";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";
import { Answer } from "@/models";

const App = () => {
  const { participants, answers } = useContext(ResultsContext);
  return (
    <TableRow key={"result-point"}>
      <TableCell component="th" scope="row" />
      {participants.map((r) => {
        return (
          <TableCell component="th" scope="row" align="center">
            {getResultPoint(r.user_id, answers)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const getResultPoint = (userID: string, answers: Array<Answer>): string => {
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
