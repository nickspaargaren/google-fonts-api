import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [ fontsData, setFontsData ] = useState<{
    data: any;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const LoadData = async () => {
      try {
        const { data } = await axios.get('/api/fonts');

        setFontsData({ data: data.items, loading: false, error: null });
      } catch (err:any) {
        setFontsData({ data: null, loading: false, error: err.message });
      }
    };

    LoadData();
  }, []);

  type font = {
    family: string;
    files: { regular: string };
    variants: string[];
  };

  const fontUrl = fontsData.data?.find((item:font) => item.family === 'Fruktur');

  const [ currentFont, setCurrentFont ] = useState({
    family: 'Roboto',
    files: {
      regular: '',
    },
    variants: [],
  });

  useEffect(() => {
    if (fontsData.loading === false) {
      setCurrentFont(fontUrl);
    }
  }, [ fontsData ]);

  const FontStyles = createGlobalStyle`

    @font-face {
      font-family: ${currentFont.family};
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(${currentFont.files.regular}) format('truetype');
    }

    body {
      font-family: ${currentFont.family}, sans-serif;
    }

`;

  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FontStyles />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing
          {' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
