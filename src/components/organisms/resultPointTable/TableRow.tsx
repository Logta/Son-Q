import { TableRow, TableCell, Chip } from "@material-ui/core";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";
import { getPoint } from "@/utils";

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
            {getPoint("normal", r.user_id, answers, participants.length)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
export { App as TableRow };
