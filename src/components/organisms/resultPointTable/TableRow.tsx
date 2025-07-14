import type { Answer, Participant } from "@son-q/types";
import { Chip, TableCell, TableRow } from "@son-q/ui-tailwind";
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
        style={{ width: "15em", minWidth: "15em", fontWeight: "bold" }}
        align="center"
      >
        <Chip color="primary" label={"得点"} variant="outline" />
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
              width: `calc(90% / ${participants.length})`,
              minWidth: `calc(90% / ${participants.length})`,
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
