import { TableHead, TableRow } from "@son-q/ui-tailwind";

const App = () => {
  return (
    <TableRow key="header">
      <TableHead className="font-bold w-48">プロジェクト名</TableHead>
      <TableHead align="center" className="font-bold">
        内容
      </TableHead>
      <TableHead align="center" className="font-bold w-32">
        出題数
      </TableHead>
      <TableHead align="center" className="font-bold w-32">
        参加人数
      </TableHead>
      <TableHead align="center" className="font-bold w-36" />
      <TableHead align="center" className="font-bold w-36" />
      <TableHead align="center" className="font-bold w-36" />
    </TableRow>
  );
};

export { App as TableHeader };
