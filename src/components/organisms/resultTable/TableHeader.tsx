import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { Participant } from "@/models";
import { ResultsContext } from "@/contexts";
import { useContext } from "react";

const App = () => {
  const { participants } = useContext(ResultsContext);
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell rowSpan={2}>出題者</TableCell>

        <TableCell colSpan={participants.length} align="center">
          回答者
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