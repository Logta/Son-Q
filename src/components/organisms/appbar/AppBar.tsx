import styles from "./AppBar.module.scss";
import { useContext } from "react";
import { GlobalContext } from "@/contexts";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppBarButton } from "@/components/atoms";
import { useRouter } from "next/router";

const App = () => {
  const { user, signInGoogle, signOut } = useContext(GlobalContext);

  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            曲当てクイズ
          </Typography>
          {user.Login ? (
            <div className={styles.button}>
              <AppBarButton
                onClick={() => {
                  signOut();
                  redirect("/");
                }}
              >
                サインアウト
              </AppBarButton>
            </div>
          ) : (
            <div className={styles.button}>
              <AppBarButton
                onClick={async () => {
                  await signInGoogle();
                  redirect("/projects");
                }}
              >
                サインイン
              </AppBarButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export { App as AppBar };
