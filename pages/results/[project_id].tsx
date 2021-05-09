import Head from "next/head";
import { QuestionPage } from "../../src/components/pages";
import { QuestionsContainer } from "../../src/components/containers";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { project_id } = router.query;
  return (
    <>
      <Head>
        <title>曲当てクイズ</title>
        <meta
          name="description"
          content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QuestionsContainer projectId={project_id as string}>
        <QuestionPage />
      </QuestionsContainer>
    </>
  );
}
