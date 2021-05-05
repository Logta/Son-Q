import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Container,AppBar,Typography,Toolbar,Button } from '@material-ui/core';

export default function Home() {
  return (
    <>
      <Head>
        <title>曲当てクイズ</title>
        <meta name="description" content="皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
       <Toolbar>
          <Typography variant="h6" className={styles.title}>
            曲当てクイズ
          </Typography>
          <Button  variant="contained" color="default">サインイン</Button>
          </Toolbar>
        </AppBar>
      <Container  maxWidth="sm">
        <main className={styles.main}>
        皆の好きな曲を持ち寄って、誰が持ってきた曲か当てよう！
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </Container>
    </>
  )
}
