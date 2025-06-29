import Image from "next/image";
import styles from "./Project.module.scss";
import { useContext, useState, Suspense } from "react";
import { Container, Button, CircularProgress, Box } from "@mui/material";
import { AppBar, ProjectTable } from "@/components/organisms";
import { ProjectsContext } from "@/contexts";
import { Label, SubLabel } from "@/components/atoms";
import { ProjectCreateDialog, ProjectJoinDialog } from "@/components/organisms";
import { useProjects } from "@/hooks/useProjects";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

/**
 * プロジェクトテーブルコンポーネント: Suspense境界内で使用
 * TanStack QueryのSuspenseモードにより、ローディング状態は自動的にSuspenseで管理される
 */
const ProjectsContent = () => {
  // TanStack Queryフックを直接使用してServer Stateを管理
  // Suspenseモードにより、データがない場合は自動的にSuspenseがローディングを表示
  const { data: projects } = useProjects();
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openJoinDialog, setOpenJoinDialog] = useState<boolean>(false);

  return (
    <>
      <main className={styles.main}>
        <Label>プロジェクト一覧</Label>
        <SubLabel>プロジェクトの作成・参加をしましょう</SubLabel>
      </main>

      <ProjectTable rows={projects || []} />
      <div className={styles.redirectButton}>
        <Button
          onClick={() => setOpenCreateDialog(true)}
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          プロジェクト作成
        </Button>
        <Button
          onClick={() => setOpenJoinDialog(true)}
          variant="contained"
          style={{ marginLeft: "1em" }}
          startIcon={<PersonAddIcon />}
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

      <ProjectCreateDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />
      <ProjectJoinDialog open={openJoinDialog} setOpen={setOpenJoinDialog} />
    </>
  );
};

/**
 * ローディングフォールバックコンポーネント
 */
const LoadingFallback = () => (
  <Container maxWidth="lg">
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  </Container>
);

/**
 * ProjectsPage: Suspenseを活用してローディング状態を管理
 */
const PageBody = () => {
  const { user } = useContext(ProjectsContext);
  
  if (!user.Login) return <AppBar />;

  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <Suspense fallback={<LoadingFallback />}>
          <ProjectsContent />
        </Suspense>
      </Container>
    </>
  );
};

export { PageBody as ProjectsPage };
