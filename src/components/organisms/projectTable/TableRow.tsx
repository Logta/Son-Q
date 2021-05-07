import { TableRow, TableCell } from "@material-ui/core";

type Props = {
  row: any;
};

const App = (props: Props) => {
  const { row } = props;
  return (
    <TableRow key={row.ID}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.ID}</TableCell>
      <TableCell align="right">{row.content}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.participents}</TableCell>
    </TableRow>
  );
};

export { App as TableRow };
