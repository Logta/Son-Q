import styles from "./AppBar.module.scss";
import { useContext } from "react";
import { GlobalContext } from "@/contexts";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppBarButton } from "@/components/atoms";

const App = () => {
  const { user, signIn, signOut } = useContext(GlobalContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            曲当てクイズ
          </Typography>
          {user.Login ? (
            <div className={styles.button}>
              <AppBarButton onClick={() => signOut()}>
                サインアウト
              </AppBarButton>
            </div>
          ) : (
            <div className={styles.button}>
              <AppBarButton onClick={() => signIn()}>サインイン</AppBarButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export { App as AppBar };
