import { Box } from "@mui/material";

const App = () => {
  return (
    <Box m={5}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <small>Copyright &copy; 2021 Logta, _bazaar records</small>
      </Box>
    </Box>
  );
};

export { App as Copyright };
