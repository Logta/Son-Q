import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const { children } = props;
  return (
    <Typography>
      <Box fontSize="h6.fontSize" paddingTop={3}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box>{children}</Box>
        </Box>
      </Box>
    </Typography>
  );
};

export { App as FormLabel };
