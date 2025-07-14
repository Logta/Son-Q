import { AppBar, AppBarButton, Box, Button, Toolbar } from "@son-q/ui-tailwind";
import Image from "next/image";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect } from "react";
import { useGlobalStore } from "@/stores";
import styles from "./AppBar.module.scss";

const App = () => {
  const { user, signInCheck, signInGoogle, signOut } = useGlobalStore();

  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialization only
  useEffect(() => {
    signInCheck();
  }, []);

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box className="mr-2 ml-1">
          <Button
            onClick={redirect("/")}
            variant="ghost"
            className="h-full px-3 text-white hover:bg-white/10 transition-colors duration-200"
          >
            <span className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-black text-white px-2 py-1 rounded shadow-lg">Black</span>
              <span className="text-white drop-shadow-lg">Jukebox</span>
              <Image
                src="/black_jukebox.png"
                alt="Black Jukebox Logo"
                width={24}
                height={24}
                className="drop-shadow-lg"
              />
            </span>
          </Button>
        </Box>
        {user?.Login ? (
          <div className={styles.button}>
            <AppBarButton
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                await signOut();
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
  );
};

export { App as AppBar };
