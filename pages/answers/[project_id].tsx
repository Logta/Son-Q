import { Copyright } from "@son-q/ui";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnswersContainer } from "../../src/components/containers";
import { AnswerPage } from "../../src/components/pages";

export default function Home() {
  const router = useRouter();
  const { project_id } = router.query;

  return (
    <>
      <Head>
        <title>回答フォーム：Black Jukebox</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {project_id && (
        <AnswersContainer projectId={project_id as string}>
          <AnswerPage />
        </AnswersContainer>
      )}
      <Copyright />
    </>
  );
}
