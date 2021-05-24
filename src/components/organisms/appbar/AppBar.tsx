import styles from "./AppBar.module.scss";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/contexts";
import { AppBar, Toolbar, Button, Switch, Box } from "@material-ui/core";
import { AppBarButton } from "@/components/atoms";
import { DarkModeSwitch } from "@/components/molecules";
import { useRouter } from "next/router";
import Image from "next/image";

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
          <Image src="/black_jukebox.png" width={20} height={20} />
          <Box mr={2}>
            <Button
              onClick={redirect("/")}
              style={{
                height: "100%",
                color: "white",
                fontSize: "16px",
              }}
            >
              Black Jukebox
            </Button>
          </Box>
          <div className={styles.button}>
            <DarkModeSwitch />
          </div>
          {user.Login ? (
            <div className={styles.button}>
              <AppBarButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const result = signOut();
                  if (result) redirect("/")(e);
                }}
              >
                サインアウト
              </AppBarButton>
            </div>
          ) : (
            <div className={styles.button}>
              <AppBarButton
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  const result = await signInGoogle();
                  if (result) redirect("/projects")(e);
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
