import Head from "next/head";
import { ProjectPage } from "../../src/components/pages";
import { ProjectContainer } from "../../src/components/containers";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { project_id } = router.query;
  return (
    <>
      <Head>
        <title>プロジェクト編集：選曲者あてクイズ</title>
        <meta
          name="description"
          content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {project_id && (
        <ProjectContainer projectId={project_id as string}>
          <ProjectPage />
        </ProjectContainer>
      )}
    </>
  );
}
