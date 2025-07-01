import { Copyright } from "@son-q/ui";
import Head from "next/head";
import { ProjectContainer } from "../../src/components/containers";
import { ProjectPage } from "../../src/components/pages";
import { useProjectIdFromRouter } from "../../src/hooks/useProjectIdFromRouter";

export default function Home() {
  const projectId = useProjectIdFromRouter();
  
  return (
    <>
      <Head>
        <title>プロジェクト編集：選曲者あてクイズ</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {projectId && (
        <ProjectContainer projectId={projectId}>
          <ProjectPage />
        </ProjectContainer>
      )}
      <Copyright />
    </>
  );
}
