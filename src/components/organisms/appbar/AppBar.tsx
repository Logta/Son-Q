import styles from "./AppBar.module.scss";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/contexts";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { AppBarButton } from "@/components/atoms";
import { useRouter } from "next/router";

const App = () => {
  const { user, signInCheck, signInGoogle, signOut } =
    useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    signInCheck();
  }, []);

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            <Button
              onClick={redirect("/")}
              style={{ height: "100%", color: "white" }}
            >
              Black Jukebox
            </Button>
          </Typography>
          {user.Login ? (
            <div className={styles.button}>
              <AppBarButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  signOut();
                  redirect("/")(e);
                }}
              >
                サインアウト
              </AppBarButton>
            </div>
          ) : (
            <div className={styles.button}>
              <AppBarButton
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  await signInGoogle();
                  redirect("/projects")(e);
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
