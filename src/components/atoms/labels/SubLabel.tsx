import styles from "./Label.module.scss";
import { ReactNode } from "react";
import { Typography, Box, Grid } from "@material-ui/core";

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Typography component="div">
        <Box fontSize="h6.fontSize" m={3}>
          <Grid container alignItems="center" justify="center">
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
