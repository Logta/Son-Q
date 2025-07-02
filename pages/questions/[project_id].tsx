import { Copyright } from "@son-q/ui";
import Head from "next/head";
import { QuestionsContainer } from "../../src/components/containers";
import { QuestionPage } from "../../src/components/pages";
import { useProjectIdFromRouter } from "../../src/hooks/useProjectIdFromRouter";

export default function Home() {
  const projectId = useProjectIdFromRouter();

  return (
    <>
      <Head>
        <title>選曲：Black Jukebox</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {projectId && (
        <QuestionsContainer projectId={projectId}>
          <QuestionPage />
        </QuestionsContainer>
      )}
      <Copyright />
    </>
  );
}
