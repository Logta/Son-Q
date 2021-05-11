import { TableHead, TableRow, TableCell } from "@material-ui/core";

const App = () => {
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell>プロジェクト名</TableCell>
        <TableCell align="center">プロジェクトID</TableCell>
        <TableCell align="center">内容</TableCell>
        <TableCell align="center">出題数</TableCell>
        <TableCell align="center">参加者</TableCell>
        <TableCell align="center">操作</TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
