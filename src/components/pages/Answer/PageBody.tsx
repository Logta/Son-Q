import Image from "next/image";
import styles from "./Answer.module.scss";
import { useContext } from "react";
import { Container, Button, Grid } from "@material-ui/core";
import { AppBar, AnswerForm } from "@/components/organisms";
import { Label, SubLabel } from "@/components/atoms";
import { AnswersContext } from "@/contexts";
import { useRouter } from "next/router";

const PageBody = () => {
  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  const { loading, answers, questionNum, questions, participants } =
    useContext(AnswersContext);

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <main className={styles.main}>
          <Label>回答フォーム</Label>
          <SubLabel>誰が選んだ曲か推理しよう！</SubLabel>
        </main>

        {!loading && answers && questionNum !== 0 && questions && participants && (
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <AnswerForm />
            </Grid>
          </Grid>
        )}

        <div className={styles.redirectButton}>
          <Button onClick={redirect("/projects")} variant="outlined">
            プロジェクト一覧に戻る
          </Button>
        </div>
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
