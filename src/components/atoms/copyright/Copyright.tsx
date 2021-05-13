import styles from "./Copyright.module.scss";
import { Box, Grid } from "@material-ui/core";

const App = () => {
  return (
    <>
      <Box m={5}>
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <small>Copyright &copy; 2021 Logta, _bazaar records</small>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { App as Copyright };
