import Head from "next/head";
import { HomePage } from "../src/components/pages";
import { Copyright } from "../src/components/atoms";

export default function Home() {
  return (
    <>
      <Head>
        <title>Black Jukebox</title>
        <meta
          name="description"
          content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
      <Copyright />
    </>
  );
}
