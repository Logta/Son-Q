import Image from "next/image";
import styles from "./Answer.module.scss";
import { useContext } from "react";
import { Container, Button, Typography } from "@material-ui/core";
import { AppBar, AnswerForm } from "@/components/organisms";
import { AnswersContext } from "@/contexts";
import { useRouter } from "next/router";

const PageBody = () => {
  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  const { loading, answers, questionNum, questions, participants } = useContext(
    AnswersContext
  );

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <Typography className={styles.main}>
          誰が選んだ曲か推理しよう！
        </Typography>

        {!loading &&
          answers &&
          questionNum !== 0 &&
          questions &&
          participants && <AnswerForm />}

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

export { PageBody as AnswerPage };
