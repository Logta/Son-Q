import Head from "next/head";
import { HomePage } from "../src/components/pages";
import { Copyright } from "../src/components/atoms";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

export default function Home() {
  return (
    <ScopedCssBaseline>
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
    </ScopedCssBaseline>
  );
}
