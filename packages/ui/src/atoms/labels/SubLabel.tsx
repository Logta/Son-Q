import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const { children } = props;
  return (
    <Typography component="div">
      <Box fontSize={16} m={1}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>{children}</Box>
        </Box>
      </Box>
    </Typography>
  );
};

export { App as SubLabel };
