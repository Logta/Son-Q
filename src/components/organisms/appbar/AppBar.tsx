import styles from "./AppBar.module.scss";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/contexts";
import { AppBar, Toolbar, Button, Box, Grid } from "@mui/material";
import { AppBarButton, DarkModeSwitch } from "@son-q/ui";
import { useRouter } from "next/router";
import Image from "next/image";

const App = () => {
  const { user, signInCheck, signInGoogle, signOut, darkMode, handleDarkModeOn, handleDarkModeOff } =
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
          <Image src="/black_jukebox.png" alt="Black Jukebox Logo" width={25} height={25} />
          <Box mr={2} ml={1}>
            <Button
              onClick={redirect("/")}
              style={{
                height: "100%",
                width: "10rem",
                color: "white",
                fontSize: "17px",
              }}
            >
              Black Jukebox
            </Button>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <div className={styles.button}>
              <DarkModeSwitch darkMode={darkMode} handleDarkModeOn={handleDarkModeOn} handleDarkModeOff={handleDarkModeOff} />
            </div>
          </Grid>
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
