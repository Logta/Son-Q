import HomeIcon from "@mui/icons-material/Home";
import { Box, CircularProgress, Container } from "@mui/material";
import { Button } from "@son-q/ui-tailwind";
import { authApi } from "@son-q/api";
import { useAllAnswers, useParticipants, useQuestions } from "@son-q/queries";
import { Label, SubLabel } from "@son-q/ui";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { AnswerForm, AppBar } from "@/components/organisms";
import { useAnswersStore } from "@/stores";
import styles from "./Answer.module.scss";

/**
 * 回答フォームコンテンツ（Suspense境界内で使用）
 */
const AnswerContent = () => {
  const { projectId } = useAnswersStore();

  // 必要なデータを並列で取得（Suspenseで自動的にローディング状態を管理）
  // 境界線：コンポーネントはhooks層のみを使用し、API層に直接アクセスしない
  const { data: answers = [] } = useAllAnswers(projectId);
  const { data: participants = [] } = useParticipants(projectId);
  const { data: questions = [] } = useQuestions(projectId);

  // 現在のユーザーを取得（簡略化のためにAPI層を直接使用）
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authApi.getCurrentUser(),
  });

  // projectIdが存在しない場合
  if (!projectId) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <p>プロジェクトIDが見つかりません</p>
      </Box>
    );
  }

  // 現在のユーザーが参加者リストに含まれているかをチェック
  const isUserJoinProject = Boolean(
    currentUser &&
      participants &&
      participants.length > 0 &&
      participants.some((p) => p.user_id === currentUser.id)
  );
  const questionNum = questions ? questions.length : 0;

  // participants が null/undefined の場合のみエラー扱い（空配列は正常）
  if (participants === null || participants === undefined) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <p>参加者情報の取得に失敗しました</p>
      </Box>
    );
  }

  // questions が null/undefined の場合のみエラー扱い（空配列は正常）
  if (questions === null || questions === undefined) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <p>問題情報の取得に失敗しました</p>
      </Box>
    );
  }

  // 問題が設定されていない場合の案内
  if (questionNum === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
        <p>このプロジェクトにはまだ問題が設定されていません。</p>
        <p>出題者が問題を設定するまでお待ちください。</p>
      </Box>
    );
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

  // biome-ignore lint/suspicious/noExplicitAny: React event type
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

        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          }
        >
          <AnswerContent />
        </Suspense>

        <div className={styles.redirectButton}>
          <Button onClick={redirect("/projects")} variant="outline">
            <HomeIcon className="mr-2" />
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

export { PageBody as AnswerPage };
