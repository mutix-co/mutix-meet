import React, { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useSWR from 'swr';
import { Formik } from 'formik';

const Chat = dynamic(() => import('../components/Chat'), { ssr: false });

export default function Index(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Run The World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Chat />
      </main>
    </div>
  );
}
