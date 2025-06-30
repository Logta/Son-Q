import { Chip, TableCell, TableRow } from "@mui/material";
import type { Answer, Participant } from "@son-q/types";
import { getPoint } from "@son-q/utils";

type Props = {
  participants: Participant[];
  answers?: Answer[];
  projectMode?: string;
};

const App = ({ participants, answers = [], projectMode = "" }: Props) => {
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
            {getPoint(projectMode, r.user_id, answers, participants.length)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
export { App as TableRow };
