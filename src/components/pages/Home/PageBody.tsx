import { Bookmark, User } from "lucide-react";
import {
  Box,
  Button,
  Container,
  DarkModeSwitch,
  Paper,
  StandardLabel,
  SubLabel,
} from "@son-q/ui-tailwind";
import Image from "next/image";
import { useRouter } from "next/router";
import { HomeStep } from "@/components/organisms";
import { useGlobalStore } from "@/stores";
import styles from "./Home.module.scss";

const PageBody = () => {
  const {
    user,
    signInGoogle,
    signOut,
    darkMode,
    handleDarkModeOn,
    handleDarkModeOff,
  } = useGlobalStore();

  const router = useRouter();

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <Container maxWidth="md">
        <main className={styles.main}>
          <StandardLabel>Black Jukebox</StandardLabel>
          <Box className="-mt-4 mb-2">
            <Image
              src={"/turntable.png"}
              alt="turntable"
              width={250}
              height={250}
            />
          </Box>
          <SubLabel>皆の好きな曲を持ち寄って、</SubLabel>
          <SubLabel>誰が持ってきた曲か当てよう！</SubLabel>
        </main>

        {user?.Login ? (
          <Box m={2} p={2}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                onClick={redirect("/projects")}
                variant="primary"
                className="m-4"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                プロジェクト一覧へ
              </Button>
              <Button
                onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                  await signOut();
                  redirect("/")(e);
                }}
                variant="outline"
                className="m-4"
              >
                <User className="mr-2 h-4 w-4" />
                サインアウト
              </Button>
            </Box>
          </Box>
        ) : (
          <Box m={2} p={2}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Button
                onClick={async (e) => {
                  await signInGoogle();
                  redirect("/projects")(e);
                }}
                variant="primary"
                className="m-4"
              >
                <User className="mr-2 h-4 w-4" />
                Google認証
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      <div className="mx-auto max-w-5xl px-6">
        <Paper variant="outlined" className="w-full bg-gray-50">
          <div className="mt-6 mb-4 px-6">
            <SubLabel>プロジェクトを作成した後に、</SubLabel>
            <SubLabel>問題を設定しましょう。</SubLabel>
            <SubLabel>参加者が回答した後に結果を確認しましょう。</SubLabel>
          </div>

          <div className="my-8 px-6">
            <HomeStep
              index={1}
              text={
                "開催者はプロジェクト一覧の「プロジェクト作成」からプロジェクトを作成しましょう。そのあと、プロジェクトIDを参加者に連絡しましょう。"
              }
              mediaUrl={"/プロジェクト-1Step_2.png"}
              mediaAlt={"プロジェクト一覧"}
              height={300}
            />
          </div>

          <div className="my-8 px-6">
            <HomeStep
              index={2}
              text={
                "作成したプロジェクトに問題を設定しましょう。問題はYoutubeのIDで設定します。"
              }
              mediaUrl={"/問題設定-2Step.png"}
              mediaAlt={"問題設定"}
              height={500}
            />
          </div>

          <div className="my-8 px-6">
            <HomeStep
              index={3}
              text={"問題設定が完了したら、回答をしましょう。"}
              mediaUrl={"/回答-3Step.png"}
              mediaAlt={"回答"}
              height={600}
            />
          </div>

          <div className="my-8 px-6">
            <HomeStep
              index={4}
              text={
                "回答が完了したら、結果を確認しましょう。持ち寄った曲を聞きながら選曲者に驚いたり、正解を自慢したりしましょう。"
              }
              mediaUrl={"/結果-4Step.png"}
              mediaAlt={"結果"}
              height={600}
            />
          </div>
        </Paper>
      </div>

      <Container maxWidth="md">
        <Box my={5} display="flex" alignItems="center" justifyContent="center">
          <DarkModeSwitch
            darkMode={darkMode}
            handleDarkModeOn={handleDarkModeOn}
            handleDarkModeOff={handleDarkModeOff}
          />
        </Box>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </Container>
    </>
  );
};

export { PageBody as HomePage };
