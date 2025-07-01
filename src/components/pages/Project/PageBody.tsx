import HomeIcon from "@mui/icons-material/Home";
import { Button, Container } from "@mui/material";
import { Label, SubLabel } from "@son-q/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectFromID } from "@son-q/api";
import {
  AppBar,
  ProjectCreateDialog,
  ProjectForm,
  ProjectJoinDialog,
} from "@/components/organisms";
import { useGlobalStore } from "@/stores";
import styles from "./Project.module.scss";

const PageBody = () => {
  const router = useRouter();

  // biome-ignore lint/suspicious/noExplicitAny: React event type
  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };
  const projectId = router.query.pid as string;
  const { user } = useGlobalStore();
  
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectFromID(projectId),
    enabled: !!user && !!projectId,
  });

  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const [openJoinDialog, setOpenJoinDialog] = useState<boolean>(false);

  return (
    project &&
    !isLoading && (
      <>
        <AppBar />
        <Container maxWidth="lg">
          <main className={styles.main}>
            <Label>プロジェクト情報</Label>
            <SubLabel>プロジェクトの確認・編集をしましょう</SubLabel>
          </main>

          <ProjectForm />

          <div className={styles.redirectButton}>
            <Button onClick={redirect("/projects")} variant="outlined" startIcon={<HomeIcon />}>
              プロジェクト一覧に戻る
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
        </Container>
        <ProjectCreateDialog open={openCreateDialog} setOpen={setOpenCreateDialog} />
        <ProjectJoinDialog open={openJoinDialog} setOpen={setOpenJoinDialog} />
      </>
    )
  );
};

export { PageBody as ProjectPage };
