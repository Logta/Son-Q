import Image from "next/image";
import { useContext } from "react";
import styles from "./Home.module.scss";
import { Container, Button, Box, Grid } from "@material-ui/core";
import { Label } from "@/components/atoms";
import { AppBar } from "@/components/organisms";
import { GlobalContext } from "@/contexts";
import { useRouter } from "next/router";

const PageBody = () => {
  const { user, signInGoogle, signInEmail, signOut } =
    useContext(GlobalContext);

  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main className={styles.main}>
          <Label>皆の好きな曲を持ち寄って、</Label>
          <Label>誰が持ってきた曲か当てよう！</Label>
        </main>

        {user.Login ? (
          <Box m={2} p={2}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Button
                  onClick={redirect("/projects")}
                  color="primary"
                  variant="contained"
                  style={{ margin: "1em" }}
                >
                  プロジェクト一覧へ
                </Button>
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    signOut();
                    redirect("/")(e);
                  }}
                  color="primary"
                  variant="outlined"
                  style={{ margin: "1em" }}
                >
                  サインアウト
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box m={2} p={2}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Button
                  onClick={async () => {
                    await signInGoogle();
                    redirect("/projects");
                  }}
                  color="primary"
                  variant="contained"
                  style={{ margin: "1em" }}
                >
                  Google認証
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box m={10} />

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </Container>
    </>
  );
};

export { PageBody as HomePage };
