import Image from "next/image";
import styles from "./Result.module.scss";
import { useContext, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { AppBar, ResultTable } from "@/components/organisms";
import { ResultsContext } from "@/contexts";
import { useRouter } from "next/router";
import _ from "lodash";

const PageBody = () => {
  const { questionNum, loading, answers, participants } = useContext(
    ResultsContext
  );

  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <main className={styles.main}>結果を確認しよう！</main>
        {!loading &&
          questionNum !== 0 &&
          !_.isNil(answers) &&
          !_.isNil(participants) && (
            <ResultTable rows={answers} participants={participants} />
          )}
        <Button onClick={redirect("/projects")}>プロジェクト一覧に戻る</Button>
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

export { PageBody as ResultPage };
