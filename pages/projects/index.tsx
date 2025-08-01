import { Copyright } from "@son-q/ui-tailwind";
import Head from "next/head";
import { ProjectsContainer } from "../../src/components/containers";
import { ProjectsPage } from "../../src/components/pages";

export default function Home() {
  return (
    <>
      <Head>
        <title>プロジェクト一覧：Black Jukebox</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProjectsContainer>
        <ProjectsPage />
      </ProjectsContainer>
      <Copyright />
    </>
  );
}
