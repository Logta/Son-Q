import Image from "next/image";
import styles from "./Answer.module.scss";
import { useContext, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { AppBar, ProjectTable } from "@/components/organisms";
import { ProjectsContext } from "@/contexts";
import { ProjectCreateDialog, ProjectJoinDialog } from "@/components/organisms";

const PageBody = () => {
  const { projects } = useContext(ProjectsContext);

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openJoinDialog, setOpenJoinDialog] = useState<boolean>(false);
  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <main className={styles.main}>
          プロジェクトの作成・参加をしましょう
        </main>

        <ProjectTable rows={projects} />
        <Button onClick={() => setOpenCreateDialog(true)}>
          プロジェクト作成
        </Button>
        <Button onClick={() => setOpenJoinDialog(true)}>
          プロジェクト参加
        </Button>

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
      <ProjectCreateDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />
      <ProjectJoinDialog open={openJoinDialog} setOpen={setOpenJoinDialog} />
    </>
  );
};

export { PageBody as AnswerPage };
