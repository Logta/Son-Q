import Head from "next/head";
import { ProjectPage } from "../../src/components/pages";

export default function Home() {
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

      <ProjectPage />
    </>
  );
}
