import { TableRow, TableCell, Chip } from "@material-ui/core";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";
import { Answer } from "@/models";

const App = () => {
  const { participants, answers } = useContext(ResultsContext);
  return (
    <TableRow key={"result-point"}>
      <TableCell
        component="th"
        scope="row"
        style={{ width: "10em", fontWeight: "bold" }}
        align="center"
      >
        <Chip color="primary" label={"得点"} variant="outlined" />
      </TableCell>
      {participants.map((r) => {
        return (
          <TableCell
            key={`${r.user_id}-result-Point`}
            component="th"
            scope="row"
            align="center"
            style={{
              borderLeftWidth: "2px",
              borderLeftStyle: "dotted",
              borderLeftColor: "lightGray",
            }}
          >
            {getCorrectPoint(r.user_id, answers)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const getCorrectPoint = (userID: string, answers: Array<Answer>): string => {
  const userAnswers = answers.filter((ans) => ans.answer_user_id === userID);
  const correctAnswers = userAnswers.filter(
    (ans) => ans.guess_user_id === ans.select_user_id
  );
  return correctAnswers.length.toString();
};
export { App as TableRow };
