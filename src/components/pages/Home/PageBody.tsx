import Image from "next/image";
import { useContext } from "react";
import styles from "./Home.module.scss";
import { Container, Button, Box, Grid, Paper } from "@material-ui/core";
import { Label, SubLabel } from "@/components/atoms";
import { HomeStep } from "@/components/organisms";
import { GlobalContext } from "@/contexts";
import { useRouter } from "next/router";

const PageBody = () => {
  const { user, signInGoogle, signInEmail, signOut } =
    useContext(GlobalContext);

  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <Container maxWidth="sm">
        <main className={styles.main}>
          <Label>Black Jukebox</Label>
          <SubLabel>皆の好きな曲を持ち寄って、</SubLabel>
          <SubLabel>誰が持ってきた曲か当てよう！</SubLabel>
        </main>

        {user.Login ? (
          <Box m={2} p={2}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Button
                  onClick={redirect("/projects")}
                  color="primary"
                  variant="contained"
                  style={{ margin: "1em" }}
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
                >
                  サインアウト
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box m={2} p={2}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Button
                  onClick={async () => {
                    const result = await signInGoogle();
                    if (result) redirect("/projects");
                  }}
                  color="primary"
                  variant="contained"
                  style={{ margin: "1em" }}
                >
                  Google認証
                </Button>
              </Grid>
            </Grid>
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
              text={
                "作成したプロジェクトに問題を設定しましょう。問題はYoutubeのIDで設定します。"
              }
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

        <Box m={10} />

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
