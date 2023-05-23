import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import PageLayout from '@/components/Layout';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <Head>
            <link rel="icon" href="/image/logo.ico" sizes="any" />
          </Head>
          <Component {...pageProps} />
        </PageLayout>
      </QueryClientProvider>
    </Provider>
  );
}
