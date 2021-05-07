import Image from "next/image";
import styles from "./Project.module.scss";
import { useContext } from "react";
import { Container, Button } from "@material-ui/core";
import { AppBar, ProjectTable } from "@/components/organisms";
import { ProjectsContext } from "@/contexts";

const PageBody = () => {
  const { projects } = useContext(ProjectsContext);
  return (
    <>
      <AppBar />
      <Container maxWidth="lg">
        <main className={styles.main}>
          プロジェクトの作成・参加をしましょう
        </main>

        <ProjectTable rows={projects} />
        <Button>プロジェクト作成</Button>
        <Button>プロジェクト参加</Button>

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

export { PageBody as ProjectPage };
