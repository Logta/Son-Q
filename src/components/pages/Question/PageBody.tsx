import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useQuestionCount, useUserQuestions } from "@son-q/queries";
import { Label, SubLabel } from "@son-q/ui";
import { isNil } from "es-toolkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import {
  AppBar,
  ProjectCreateDialog,
  ProjectJoinDialog,
  QuestionForm,
} from "@/components/organisms";
import { useQuestionsStore } from "@/stores";
import styles from "./Question.module.scss";

/**
 * 問題フォームコンテンツ（Suspense境界内で使用）
 */
const QuestionContent = () => {
  const { projectId } = useQuestionsStore();
  const { data: questions = [] } = useUserQuestions(projectId);

  // 問題数を取得
  const { data: questionNum = 0 } = useQuestionCount(projectId);

  if (questionNum === 0 || isNil(questions)) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <p>データの取得に失敗しました</p>
      </Box>
    );
  }

  return <QuestionForm nums={questionNum} questions={questions} />;
};

/**
 * QuestionPage: TanStack QueryとSuspenseを活用
 */
const PageBody = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openJoinDialog, setOpenJoinDialog] = useState<boolean>(false);

  const router = useRouter();

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className={styles.body}>
      <AppBar />
      <Container maxWidth="lg">
        <main className={styles.main}>
          <Label>出題フォーム</Label>
          <SubLabel>問題を設定しましょう！</SubLabel>
          <Typography color="secondary">※出題するYoutube動画IDを記入してください</Typography>
        </main>

        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          }
        >
          <QuestionContent />
        </Suspense>

        <div className={styles.redirectButton}>
          <Button onClick={redirect("/projects")} variant="outlined" startIcon={<HomeIcon />}>
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
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </Container>
      <ProjectCreateDialog open={openCreateDialog} setOpen={setOpenCreateDialog} />
      <ProjectJoinDialog open={openJoinDialog} setOpen={setOpenJoinDialog} />
    </div>
  );
};

export { PageBody as QuestionPage };
