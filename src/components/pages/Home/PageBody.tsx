import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Box, Button, Container, Paper } from "@mui/material";
import { DarkModeSwitch, Label, SubLabel } from "@son-q/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { HomeStep } from "@/components/organisms";
import { GlobalContext } from "@/contexts";
import styles from "./Home.module.scss";

const PageBody = () => {
  const { user, signInGoogle, signOut, darkMode, handleDarkModeOn, handleDarkModeOff } =
    useContext(GlobalContext);

  const router = useRouter();

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Container maxWidth="sm">
      <main className={styles.main}>
        <Label>Black Jukebox</Label>
        <Box mt={-4} mb={2}>
          <Image src={"/turntable.png"} alt="turntable" width={250} height={250} />
        </Box>
        <SubLabel>皆の好きな曲を持ち寄って、</SubLabel>
        <SubLabel>誰が持ってきた曲か当てよう！</SubLabel>
      </main>

      {user.Login ? (
        <Box m={2} p={2}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={redirect("/projects")}
              color="primary"
              variant="contained"
              style={{ margin: "1em" }}
              startIcon={<BookmarksIcon />}
            >
              プロジェクト一覧へ
            </Button>
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                signOut();
                redirect("/")(e);
              }}
              color="primary"
              variant="outlined"
              style={{ margin: "1em" }}
              startIcon={<AccountCircleIcon />}
            >
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
              color="primary"
              variant="contained"
              style={{ margin: "1em" }}
              startIcon={<AccountCircleIcon />}
            >
              Google認証
            </Button>
          </Box>
        </Box>
      )}

      <Paper variant="outlined">
        <Box mt={5}>
          <SubLabel>プロジェクトを作成した後に、</SubLabel>
          <SubLabel>問題を設定しましょう。</SubLabel>
          <SubLabel>参加者が回答した後に結果を確認しましょう。</SubLabel>
        </Box>

        <Box mt={5} px={2}>
          <HomeStep
            index={1}
            text={
              "開催者はプロジェクト一覧の「プロジェクト作成」からプロジェクトを作成しましょう。そのあと、プロジェクトIDを参加者に連絡しましょう。"
            }
            mediaUrl={"/プロジェクト-1Step_2.png"}
            mediaAlt={"プロジェクト一覧"}
            height={190}
          />
        </Box>

        <Box my={5} px={2}>
          <HomeStep
            index={2}
            text={"作成したプロジェクトに問題を設定しましょう。問題はYoutubeのIDで設定します。"}
            mediaUrl={"/問題設定-2Step.png"}
            mediaAlt={"問題設定"}
            height={260}
          />
        </Box>

        <Box my={5} px={2}>
          <HomeStep
            index={3}
            text={"問題設定が完了したら、回答をしましょう。"}
            mediaUrl={"/回答-3Step.png"}
            mediaAlt={"回答"}
            height={450}
          />
        </Box>

        <Box my={5} px={2}>
          <HomeStep
            index={4}
            text={
              "回答が完了したら、結果を確認しましょう。持ち寄った曲を聞きながら選曲者に驚いたり、正解を自慢したりしましょう。"
            }
            mediaUrl={"/結果-4Step.png"}
            mediaAlt={"結果"}
            height={400}
          />
        </Box>
      </Paper>

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
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Container>
  );
};

export { PageBody as HomePage };
