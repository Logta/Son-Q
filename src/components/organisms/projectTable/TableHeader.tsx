import { TableHead, TableRow, TableCell } from "@material-ui/core";

const App = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>プロジェクト名</TableCell>
        <TableCell align="right">ID</TableCell>
        <TableCell align="right">内容</TableCell>
        <TableCell align="right">出題数</TableCell>
        <TableCell align="right">参加者</TableCell>
        <TableCell align="right">操作</TableCell>
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
