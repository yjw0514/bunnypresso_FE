import PageLayout from '@/components/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Head>
          <link rel="icon" href="/image/logo.ico" sizes="any" />
        </Head>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}
