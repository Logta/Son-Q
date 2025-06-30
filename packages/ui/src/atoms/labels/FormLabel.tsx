import styles from "./Label.module.scss";
import { ReactNode } from "react";
import { Typography, Box } from "@mui/material";

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Typography>
        <Box fontSize="h6.fontSize" paddingTop={3}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box>{children}</Box>
          </Box>
        </Box>
      </Typography>
    </>
  );
};

export { App as FormLabel };
