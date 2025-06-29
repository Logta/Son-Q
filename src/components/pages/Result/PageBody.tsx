import Image from "next/image";
import styles from "./Result.module.scss";
import { useContext, Suspense } from "react";
import { Container, Button, Box, CircularProgress } from "@mui/material";
import { AppBar, ResultPointTable, ResultTable } from "@/components/organisms";
import { ResultsContext } from "@/contexts";
import { useRouter } from "next/router";
import { Label, SubLabel } from "@/components/atoms";
import { isNil } from "es-toolkit";
import { useQuery } from "@tanstack/react-query";
import { getAllAnswers, getParticipants, getQuestionNumber, getAllQuestions, getProjectMode } from "@/firebase";

import HomeIcon from "@mui/icons-material/Home";

/**
 * 結果コンテンツ（Suspense境界内で使用）
 */
const ResultContent = () => {
  const { projectId } = useContext(ResultsContext);
  
  console.log("ResultContent projectId:", projectId);
  
  // 必要なデータを並列で取得
  const { data: questionNum = 0 } = useQuery({
    queryKey: ["questionNumber", projectId],
    queryFn: () => getQuestionNumber(projectId),
    enabled: !!projectId,
  });

  const { data: answers = [] } = useQuery({
    queryKey: ["allAnswers", projectId],
    queryFn: async () => {
      console.log("Fetching answers for projectId:", projectId);
      const result = await getAllAnswers(projectId);
      console.log("Answers fetched:", result);
      return result;
    },
    enabled: !!projectId,
  });

  const { data: participants = [] } = useQuery({
    queryKey: ["participants", projectId],
    queryFn: async () => {
      console.log("Fetching participants for projectId:", projectId);
      const result = await getParticipants(projectId);
      console.log("Participants fetched:", result);
      return result;
    },
    enabled: !!projectId,
  });

  const { data: questions = [] } = useQuery({
    queryKey: ["questions", projectId],
    queryFn: async () => {
      console.log("Fetching questions for projectId:", projectId);
      const result = await getAllQuestions(projectId);
      console.log("Questions fetched:", result);
      return result;
    },
    enabled: !!projectId,
  });

  const { data: projectMode = "" } = useQuery({
    queryKey: ["projectMode", projectId],
    queryFn: async () => {
      console.log("Fetching projectMode for projectId:", projectId);
      const result = await getProjectMode(projectId);
      console.log("ProjectMode fetched:", result);
      return result;
    },
    enabled: !!projectId,
  });

  if (questionNum === 0 || isNil(answers) || isNil(participants) || isNil(questions)) {
    return null;
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

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <main className={styles.main}>
          <Label>結果一覧</Label>
          <SubLabel>結果を確認しよう！</SubLabel>
        </main>
        
        <Suspense fallback={
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        }>
          <ResultContent />
        </Suspense>
        
        <div className={styles.redirectButton}>
          <Button
            onClick={redirect("/projects")}
            variant="outlined"
            startIcon={<HomeIcon />}
          >
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

export { PageBody as ResultPage };
