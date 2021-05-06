import styles from "./AppBar.module.css";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppBarButton } from "@/components/atoms";

const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            曲当てクイズ
          </Typography>
          <AppBarButton onClick={() => {}}>サインイン</AppBarButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export { App as AppBar };
