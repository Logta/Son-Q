import Image from "next/image";
import styles from "./Home.module.css";
import { Container } from "@material-ui/core";
import { AppBar } from "@/components/organisms";
import { Youtube } from "@/components/atoms";

const PageBody = () => {
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main className={styles.main}>
          皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！
        </main>

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
