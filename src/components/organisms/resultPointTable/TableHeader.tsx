import { TableHead, TableRow, TableCell, Chip, Box } from "@material-ui/core";
import { Participant } from "@/models";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";

const App = () => {
  const { participants } = useContext(ResultsContext);
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell
          component="th"
          padding="none"
          align="center"
          style={{ width: "5em" }}
        >
          <Box ml={2}>
            <Chip color="primary" label={"回答者"} />
          </Box>
        </TableCell>
        {participants.map((part: Participant) => {
          return <TableCell align="center">{part.user_name}</TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
