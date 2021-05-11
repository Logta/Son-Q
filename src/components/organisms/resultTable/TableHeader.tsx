import { TableHead, TableRow, TableCell, Box, Chip } from "@material-ui/core";
import { Participant } from "@/models";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";

const App = () => {
  const { participants } = useContext(ResultsContext);
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell rowSpan={2}>
          <Box ml={2}>
            <Chip color="secondary" label={"出題者"} />
          </Box>
        </TableCell>

        <TableCell colSpan={participants.length} align="center">
          <Box ml={2}>
            <Chip color="primary" label={"回答者"} />
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        {participants.map((part: Participant) => {
          return <TableCell align="center">{part.user_name}</TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
