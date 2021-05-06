import Image from "next/image";
import { useContext } from "react";
import styles from "./Home.module.css";
import { Container, Button } from "@material-ui/core";
import { AppBar } from "@/components/organisms";
import { Youtube } from "@/components/atoms";
import { UserContext } from "@/contexts";

const PageBody = () => {
  const { user, signIn, signOut } = useContext(UserContext);
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main className={styles.main}>
          皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！
        </main>

        {user.Login ? (
          <Button onClick={() => signOut()}>サインアウト</Button>
        ) : (
          <Button onClick={() => signIn()}>サインイン</Button>
        )}

        <Youtube id={"OutA_EstePs"} />
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

export { PageBody };
