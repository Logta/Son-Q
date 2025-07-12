import { Box, Chip, TableHead, TableRow } from "@son-q/ui-tailwind";
import type { Participant } from "@son-q/types";

type Props = {
  participants: Participant[];
};

const App = ({ participants }: Props) => {
  return (
    <>
      <TableRow key="header-result">
        <TableHead
          rowSpan={2}
          align="center"
          style={{
            width: "2em",
            minWidth: "2em",
            fontWeight: "bold",
          }}
        >
          No.
        </TableHead>
        <TableHead
          rowSpan={2}
          align="center"
          style={{
            width: "10em",
            minWidth: "10em",
            fontWeight: "bold",
            borderLeftWidth: "1px",
            borderLeftStyle: "solid",
            borderLeftColor: "lightGray",
          }}
        >
          <Chip color="secondary" label={"出題者"} />
        </TableHead>
        <TableHead
          rowSpan={2}
          align="center"
          style={{
            width: "5em",
            minWidth: "5em",
            fontWeight: "bold",
            borderLeftWidth: "2px",
            borderLeftStyle: "dotted",
            borderLeftColor: "lightGray",
          }}
        >
          課題曲
        </TableHead>

        <TableHead
          colSpan={participants.length * 2}
          align="center"
          style={{
            fontWeight: "bold",
            borderLeftWidth: "3px",
            borderLeftStyle: "solid",
            borderLeftColor: "lightGray",
          }}
        >
          <Box className="ml-2">
            <Chip color="primary" label={"回答者"} />
          </Box>
        </TableHead>
      </TableRow>
      <TableRow>
        {participants.map((part: Participant) => {
          return (
            <TableHead
              key={`${part.user_id}-result-answer-part`}
              colSpan={2}
              align="center"
              style={{
                fontWeight: "bold",
                borderLeftWidth: "3px",
                borderLeftStyle: "solid",
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
    </>
  );
};

export { App as TableHeader };
