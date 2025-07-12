import type { Participant } from "@son-q/types";
import { Chip, TableHead, TableRow } from "@son-q/ui-tailwind";

type Props = {
  participants: Participant[];
};

const App = ({ participants }: Props) => {
  return (
    <TableRow key="header-result-point">
      <TableHead
        align="center"
        style={{ width: "15em", minWidth: "15em", fontWeight: "bold" }}
      >
        <Chip color="primary" label={"回答者"} />
      </TableHead>
      {participants.map((part: Participant) => {
        return (
          <TableHead
            key={part.user_id}
            align="center"
            style={{
              fontWeight: "bold",
              borderLeftWidth: "2px",
              borderLeftStyle: "dotted",
              borderLeftColor: "lightGray",
              width: `calc(90% / ${participants.length})`,
              minWidth: `calc(90% / ${participants.length})`,
            }}
          >
            {part.user_name}
          </TableHead>
        );
      })}
    </TableRow>
  );
};

export { App as TableHeader };
