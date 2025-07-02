import { Copyright } from "@son-q/ui";
import Head from "next/head";
import { AnswersContainer } from "../../src/components/containers";
import { AnswerPage } from "../../src/components/pages";
import { useProjectIdFromRouter } from "../../src/hooks/useProjectIdFromRouter";

export default function Home() {
  const projectId = useProjectIdFromRouter();

  return (
    <>
      <Head>
        <title>回答フォーム：Black Jukebox</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {projectId && (
        <AnswersContainer projectId={projectId}>
          <AnswerPage />
        </AnswersContainer>
      )}
      <Copyright />
    </>
  );
}
