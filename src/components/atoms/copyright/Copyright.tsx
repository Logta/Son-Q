import styles from "./Copyright.module.scss";
import { Box, Grid } from "@mui/material";

const App = () => {
  return (
    <>
      <Box m={5}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <small>Copyright &copy; 2021 Logta, _bazaar records</small>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export { App as Copyright };
