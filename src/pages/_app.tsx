import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/index';
import PageLayout from '@/components/Layout';
import '@/styles/globals.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PageLayout>
            <Head>
              <link rel="icon" href="/image/logo.ico" sizes="any" />
            </Head>
            <Component {...pageProps} />
          </PageLayout>
          <ReactQueryDevtools initialIsOpen={false} position="top-left" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
