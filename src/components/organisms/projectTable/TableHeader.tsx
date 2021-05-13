import { TableHead, TableRow, TableCell } from "@material-ui/core";

const App = () => {
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell style={{ width: "12em" }}>プロジェクト名</TableCell>
        <TableCell align="center">内容</TableCell>
        <TableCell align="center" style={{ width: "8em" }}>
          出題数
        </TableCell>
        <TableCell align="center" style={{ width: "8em" }}>
          参加人数
        </TableCell>
        <TableCell align="center" style={{ width: "21em" }}>
          操作
        </TableCell>
        <TableCell align="center" style={{ width: "7em" }}></TableCell>
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
