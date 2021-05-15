import styles from "./AppBar.module.scss";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/contexts";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
} from "@material-ui/core";
import { AppBarButton } from "@/components/atoms";
import { useRouter } from "next/router";
import Image from "next/image";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness2Icon from "@material-ui/icons/Brightness2";

const App = () => {
  const {
    user,
    signInCheck,
    signInGoogle,
    signOut,
    handleDarkModeOff,
    handleDarkModeOn,
    darkMode,
  } = useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    signInCheck();
  }, []);

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const handleChange = () => {
    !darkMode ? handleDarkModeOn() : handleDarkModeOff();
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
          <Brightness7Icon />
          <Switch
            checked={darkMode}
            onChange={handleChange}
            color="default"
            name="darkMode"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Brightness2Icon />
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
