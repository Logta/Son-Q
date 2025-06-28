import styles from "./Label.module.scss";
import { ReactNode } from "react";
import { Typography, Box, Grid } from "@mui/material";

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Typography component="div">
        <Box fontSize="h6.fontSize" fontWeight="fontWeightBold" m={2}>
          <Box>{children}</Box>
        </Box>
      </Typography>
    </>
  );
};

export { App as Label };
