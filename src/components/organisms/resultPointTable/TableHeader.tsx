import { TableHead, TableRow, TableCell } from "@material-ui/core";
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
          回答者
        </TableCell>
        {participants.map((part: Participant) => {
          return <TableCell align="center">{part.user_name}</TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
