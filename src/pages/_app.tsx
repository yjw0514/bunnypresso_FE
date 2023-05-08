import PageLayout from '@/components/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Head>
        <link rel="icon" href="/image/logo.ico" sizes="any" />
      </Head>
      <Component {...pageProps} />
    </PageLayout>
  );
}
