import Image from "next/image";
import { useContext } from "react";
import styles from "./Home.module.scss";
import { Container, Button, Typography, Box } from "@material-ui/core";
import { AppBar } from "@/components/organisms";
import { GlobalContext } from "@/contexts";
import { useRouter } from "next/router";

const PageBody = () => {
  const { user, signIn, signOut } = useContext(GlobalContext);

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
          <Typography variant="h6">
            皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！
          </Typography>
        </main>

        {user.Login ? (
          <>
            <Button
              onClick={redirect("/projects")}
              color="primary"
              variant="contained"
            >
              プロジェクト一覧へ
            </Button>
            <Button
              onClick={() => signOut()}
              color="primary"
              variant="outlined"
            >
              サインアウト
            </Button>
          </>
        ) : (
          <Button onClick={() => signIn()} color="primary" variant="contained">
            サインイン
          </Button>
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
