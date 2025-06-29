import Image from "next/image";
import styles from "./Answer.module.scss";
import { useContext, Suspense } from "react";
import { Container, Button, Box, CircularProgress } from "@mui/material";
import { AppBar, AnswerForm } from "@/components/organisms";
import { Label, SubLabel } from "@/components/atoms";
import { AnswersContext } from "@/contexts";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAnswer, getParticipants, getAllQuestions } from "@/firebase";
import { awaitOnAuth } from "@/firebase";
import { isNil } from "es-toolkit";

import HomeIcon from "@mui/icons-material/Home";

/**
 * 回答フォームコンテンツ（Suspense境界内で使用）
 */
const AnswerContent = () => {
  const { projectId } = useContext(AnswersContext);
  
  // 必要なデータを並列で取得
  const { data: answers = [] } = useQuery({
    queryKey: ["answers", projectId],
    queryFn: async () => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) throw new Error("認証エラー");
      return await getAnswer(user, projectId);
    },
    enabled: !!projectId,
  });

  const { data: participants = [] } = useQuery({
    queryKey: ["participants", projectId],
    queryFn: () => getParticipants(projectId),
    enabled: !!projectId,
  });

  const { data: questions = [] } = useQuery({
    queryKey: ["questions", projectId],
    queryFn: () => getAllQuestions(projectId),
    enabled: !!projectId,
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) throw new Error("認証エラー");
      return user;
    },
  });
  
  // 現在のユーザーが参加者リストに含まれているかをチェック
  const isUserJoinProject = Boolean(
    currentUser && 
    participants && 
    participants.length > 0 && 
    participants.some(p => p.user_id === currentUser.id)
  );
  const questionNum = questions.length;

  console.log("Answer PageBody Debug:");
  console.log("- currentUser:", currentUser);
  console.log("- currentUser.id:", currentUser?.id);
  console.log("- participants:", participants);
  console.log("- participants IDs:", participants.map(p => p.user_id));
  console.log("- isUserJoinProject:", isUserJoinProject);
  console.log("- questionNum:", questionNum);

  if (questionNum === 0 || isNil(questions) || isNil(participants)) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <AnswerForm 
        answers={answers}
        questionNum={questionNum}
        questions={questions}
        participants={participants}
        isUserJoinProject={isUserJoinProject}
      />
    </Box>
  );
};

/**
 * AnswerPage: TanStack QueryとSuspenseを活用
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
          <Label>回答フォーム</Label>
          <SubLabel>誰が選んだ曲か推理しよう！</SubLabel>
        </main>

        <Suspense fallback={
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        }>
          <AnswerContent />
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

export { PageBody as AnswerPage };
