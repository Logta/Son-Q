import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, CircularProgress, Container } from "@mui/material";
import { useProjects } from "@son-q/queries";
import { Button, StandardLabel, SubLabel } from "@son-q/ui-tailwind";
import Image from "next/image";
import { Suspense, useState } from "react";
import {
  AppBar,
  ProjectCreateDialog,
  ProjectJoinDialog,
  ProjectTable,
} from "@/components/organisms";
import { useProjectsStore } from "@/stores";
import styles from "./Project.module.scss";

/**
 * プロジェクトテーブルコンポーネント: Suspense境界内で使用
 */
const ProjectsContent = () => {
  const { data: projects } = useProjects();
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openJoinDialog, setOpenJoinDialog] = useState<boolean>(false);

  return (
    <>
      <main className={styles.main}>
        <StandardLabel>プロジェクト一覧</StandardLabel>
        <SubLabel>プロジェクトの作成・参加をしましょう</SubLabel>
      </main>

      <ProjectTable rows={projects || []} />
      <div className={styles.redirectButton}>
        <Button onClick={() => setOpenCreateDialog(true)} variant="primary">
          <AddCircleIcon className="mr-2" />
          プロジェクト作成
        </Button>
        <Button onClick={() => setOpenJoinDialog(true)} variant="primary" className="ml-4">
          <PersonAddIcon className="mr-2" />
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
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>

      <ProjectCreateDialog open={openCreateDialog} setOpen={setOpenCreateDialog} />
      <ProjectJoinDialog open={openJoinDialog} setOpen={setOpenJoinDialog} />
    </>
  );
};

/**
 * ProjectsPage: TanStack QueryとSuspenseを活用
 */
const PageBody = () => {
  const { user } = useProjectsStore();

  if (!user?.Login) return <AppBar />;

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          }
        >
          <ProjectsContent />
        </Suspense>
      </Container>
    </>
  );
};

export { PageBody as ProjectsPage };
