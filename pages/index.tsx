import Head from "next/head";
import { HomePage } from "../src/components/pages";

export default function Home() {
  return (
    <>
      <Head>
        <title>選曲者あてクイズ</title>
        <meta
          name="description"
          content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </>
  );
}
