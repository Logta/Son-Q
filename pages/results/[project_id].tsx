import { Copyright } from "@son-q/ui";
import Head from "next/head";
import { useRouter } from "next/router";
import { ResultsContainer } from "../../src/components/containers";
import { ResultPage } from "../../src/components/pages";

export default function Home() {
  const router = useRouter();
  const { project_id } = router.query;
  return (
    <>
      <Head>
        <title>結果表示：選曲者あてクイズ</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {project_id && (
        <ResultsContainer projectId={project_id as string}>
          <ResultPage />
        </ResultsContainer>
      )}
      <Copyright />
    </>
  );
}
