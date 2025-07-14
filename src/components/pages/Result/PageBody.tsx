import {
  useAllAnswers,
  useParticipants,
  useProjectMode,
  useQuestionNumber,
  useQuestions,
} from "@son-q/queries";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  StandardLabel,
  SubLabel,
} from "@son-q/ui-tailwind";
import { isNil } from "es-toolkit";
import { Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { AppBar, ResultPointTable, ResultTable } from "@/components/organisms";
import { useResultsStore } from "@/stores";
import styles from "./Result.module.scss";

/**
 * 結果コンテンツ（Suspense境界内で使用）
 */
const ResultContent = () => {
  const { projectId } = useResultsStore();

  // 必要なデータを並列で取得（Suspenseで自動的にローディング状態を管理）
  const { data: questionNum = 0 } = useQuestionNumber(projectId);
  const { data: answers = [] } = useAllAnswers(projectId);
  const { data: participants = [] } = useParticipants(projectId);
  const { data: questions = [] } = useQuestions(projectId);
  const { data: projectMode = "" } = useProjectMode(projectId);

  if (questionNum === 0 || isNil(answers) || isNil(participants) || isNil(questions)) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <p>データの取得に失敗しました</p>
      </Box>
    );
  }

  return (
    <>
      <SubLabel>
        <strong>得点表</strong>
      </SubLabel>
      <ResultPointTable participants={participants} answers={answers} projectMode={projectMode} />
      <Box m={5} />
      <SubLabel>
        <strong>回答一覧</strong>
      </SubLabel>
      <ResultTable participants={participants} answers={answers} questions={questions} />
    </>
  );
};

/**
 * ResultPage: TanStack QueryとSuspenseを活用
 */
const PageBody = () => {
  const router = useRouter();

  const redirect = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="7xl" disableGutters>
        <main className={styles.main}>
          <StandardLabel>結果一覧</StandardLabel>
          <SubLabel>結果を確認しよう！</SubLabel>
        </main>

        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          }
        >
          <ResultContent />
        </Suspense>

        <div className={styles.redirectButton}>
          <Button onClick={redirect("/projects")} variant="outline">
            <Home className="mr-2" />
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
    </>
  );
};

export { PageBody as ResultPage };
