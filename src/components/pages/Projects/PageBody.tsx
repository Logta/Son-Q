import Image from "next/image";
import styles from "./Project.module.scss";
import { useContext, useState } from "react";
import { Container, Button } from "@material-ui/core";
import { AppBar, ProjectTable } from "@/components/organisms";
import { ProjectsContext } from "@/contexts";
import { Label } from "@/components/atoms";
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
          <Label>プロジェクトの作成・参加をしましょう</Label>
        </main>

        <ProjectTable rows={projects} />
        <div className={styles.redirectButton}>
          <Button
            onClick={() => setOpenCreateDialog(true)}
            variant="contained"
            color="primary"
          >
            プロジェクト作成
          </Button>
          <Button
            onClick={() => setOpenJoinDialog(true)}
            variant="contained"
            style={{ marginLeft: "1em" }}
          >
            プロジェクト参加
          </Button>
        </div>

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

export { PageBody as ProjectsPage };
