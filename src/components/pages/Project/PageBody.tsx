import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/material";
import { Button } from "@son-q/ui-tailwind";
import { getProjectFromID } from "@son-q/api";
import { Label, SubLabel } from "@son-q/ui";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AppBar,
  ProjectCreateDialog,
  ProjectForm,
  ProjectJoinDialog,
} from "@/components/organisms";
import { useProjectIdFromRouter } from "@/hooks/useProjectIdFromRouter";
import { useGlobalStore } from "@/stores";
import styles from "./Project.module.scss";

const PageBody = () => {
  const router = useRouter();

  const redirect = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };
  const projectId = useProjectIdFromRouter();
  const { user } = useGlobalStore();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
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
            <Button onClick={redirect("/projects")} variant="outline">
              <HomeIcon className="mr-2" />
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
