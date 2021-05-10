import Image from "next/image";
import styles from "./Question.module.scss";
import { useContext, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { AppBar, QuestionForm } from "@/components/organisms";
import { QuestionsContext } from "@/contexts";
import { ProjectCreateDialog, ProjectJoinDialog } from "@/components/organisms";
import { useRouter } from "next/router";
import _ from "lodash";

const PageBody = () => {
  const { questions, questionNum, loading } = useContext(QuestionsContext);

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openJoinDialog, setOpenJoinDialog] = useState<boolean>(false);

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
        {!loading && questionNum !== 0 && !_.isNil(questions) && (
          <QuestionForm nums={questionNum} questions={questions} />
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
      <ProjectCreateDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />
      <ProjectJoinDialog open={openJoinDialog} setOpen={setOpenJoinDialog} />
    </>
  );
};

export { PageBody as ResultPage };
