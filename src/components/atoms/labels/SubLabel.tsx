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
        <Box fontSize={16} m={1}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Box>{children}</Box>
            </Grid>
          </Grid>
        </Box>
      </Typography>
    </>
  );
};

export { App as SubLabel };
