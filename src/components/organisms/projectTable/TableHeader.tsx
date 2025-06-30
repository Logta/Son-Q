import { TableCell, TableHead, TableRow } from "@mui/material";

const App = () => {
  return (
    <TableHead>
      <TableRow key="header">
        <TableCell
          style={{
            fontWeight: "bold",
            width: "12em",
          }}
        >
          プロジェクト名
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontWeight: "bold",
          }}
        >
          内容
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontWeight: "bold",
            width: "8em",
          }}
        >
          出題数
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontWeight: "bold",
            width: "8em",
          }}
        >
          参加人数
        </TableCell>
        <TableCell
          align="center"
          style={{
            fontWeight: "bold",
            width: "9em",
          }}
        />
        <TableCell
          align="center"
          style={{
            fontWeight: "bold",
            width: "9em",
          }}
        />
        <TableCell
          align="center"
          style={{
            fontWeight: "bold",
            width: "9em",
          }}
        />
      </TableRow>
    </TableHead>
  );
};

export { App as TableHeader };
