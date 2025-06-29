import { TableHead, TableRow, TableCell, Chip, Box } from "@mui/material";
import { Participant } from "@/models";

type Props = {
  participants: Participant[];
};

const App = ({ participants }: Props) => {
  return (
    <TableHead>
      <TableRow key="header-result-point">
        <TableCell
          component="th"
          padding="none"
          align="center"
          style={{ width: "15em", minWidth: "15em", fontWeight: "bold" }}
        >
          <Chip color="primary" label={"回答者"} />
        </TableCell>
        {participants.map((part: Participant) => {
          return (
            <TableCell
              align="center"
              style={{
                fontWeight: "bold",
                borderLeftWidth: "2px",
                borderLeftStyle: "dotted",
                borderLeftColor: "lightGray",
                width: `calc(90% / ${participants.length})`,
              }}
            >
              {part.user_name}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
