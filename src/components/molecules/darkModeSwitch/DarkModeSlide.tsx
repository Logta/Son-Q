import styles from "./DarkModeSwitch.module.scss";
import { Switch, Grid, Box, FormGroup } from "@material-ui/core";
import { useContext } from "react";
import { GlobalContext } from "@/contexts";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import _ from "lodash";

const DarkModeSwitch = () => {
  const { handleDarkModeOff, handleDarkModeOn, darkMode } =
    useContext(GlobalContext);

  const handleChange = () => {
    !darkMode ? handleDarkModeOn() : handleDarkModeOff();
  };
  return (
    !_.isNil(darkMode) && (
      <FormGroup>
        <Grid direction="row" container alignItems="center" spacing={1}>
          <Grid item>
            <Box mt={0.75}>
              <Brightness7Icon />
            </Box>
          </Grid>

          <Grid item>
            <Box marginX={-1}>
              <Switch
                checked={darkMode}
                onChange={handleChange}
                color="default"
                name="darkMode"
              />
            </Box>
          </Grid>

          <Grid item>
            <Box mt={0.75}>
              <Brightness2Icon />
            </Box>
          </Grid>
        </Grid>
      </FormGroup>
    )
  );
};

export { DarkModeSwitch };
