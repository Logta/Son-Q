import { Copyright } from "@son-q/ui-tailwind";
import Head from "next/head";
import { ResultsContainer } from "../../src/components/containers";
import { ResultPage } from "../../src/components/pages";
import { useProjectIdFromRouter } from "../../src/hooks/useProjectIdFromRouter";

export default function Home() {
  const projectId = useProjectIdFromRouter();

  return (
    <>
      <Head>
        <title>結果表示：選曲者あてクイズ</title>
        <meta
          name="description"
          content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {projectId && (
        <ResultsContainer projectId={projectId}>
          <ResultPage />
        </ResultsContainer>
      )}
      <Copyright />
    </>
  );
}
