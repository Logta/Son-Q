import { TableCell, TableHead, TableRow } from "@son-q/ui-tailwind";

const App = () => {
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell className="font-bold w-48">
          プロジェクト名
        </TableCell>
        <TableCell align="center" className="font-bold">
          内容
        </TableCell>
        <TableCell align="center" className="font-bold w-32">
          出題数
        </TableCell>
        <TableCell align="center" className="font-bold w-32">
          参加人数
        </TableCell>
        <TableCell align="center" className="font-bold w-36" />
        <TableCell align="center" className="font-bold w-36" />
        <TableCell align="center" className="font-bold w-36" />
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
