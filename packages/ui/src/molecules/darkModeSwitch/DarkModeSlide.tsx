import styles from "./DarkModeSwitch.module.scss";
import { Switch, Box, FormGroup } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import { isNil } from "es-toolkit";

type DarkModeSwitchProps = {
  darkMode: boolean;
  handleDarkModeOn: () => void;
  handleDarkModeOff: () => void;
};

const DarkModeSwitch = ({ darkMode, handleDarkModeOn, handleDarkModeOff }: DarkModeSwitchProps) => {

  const handleChange = () => {
    !darkMode ? handleDarkModeOn() : handleDarkModeOff();
  };
  return (
    !isNil(darkMode) && (
      <FormGroup>
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
          <Box mt={0.75}>
            <Brightness7Icon />
          </Box>

          <Box marginX={-1}>
            <Switch
              checked={darkMode}
              onChange={handleChange}
              color="default"
              name="darkMode"
            />
          </Box>

          <Box mt={0.75}>
            <Brightness2Icon />
          </Box>
        </Box>
      </FormGroup>
    )
  );
};

export { DarkModeSwitch };
