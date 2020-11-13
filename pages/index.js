import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('../components/Chat'), { ssr: false });

export default function Index() {
  return (
    <div>
      <Head>
        <title>Global Meet By Mutix</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="//jitsi.jothon.online/libs/lib-jitsi-meet.min.js" />
        <script
          src="//code.jquery.com/jquery-3.5.1.min.js"
          integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <Chat />
      </main>
    </div>
  );
}
