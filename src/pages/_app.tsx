import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { wrapper } from '@/store/index';
import PageLayout from '@/components/Layout';
import '@/styles/globals.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <link rel="icon" href="/image/logo.ico" sizes="any" />
            <title>버니프레소</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, user-scalable=0, maximum-scale=1, viewport-fit=contain"
            />
            <meta
              name="description"
              content="맛있는 음료와 디저트를 즐겨보세요."
              key="desc"
            />
            <meta property="og:title" content="버니프레소" />
            <meta
              property="og:description"
              content="버니프레소에서 맛있는 음료와 디저트를 즐겨보세요."
            />
            <meta
              property="og:image"
              content="https://plus.unsplash.com/premium_photo-1671013032517-481b086eced1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            />
          </Head>
          <PageLayout>
            <Component {...props.pageProps} />
          </PageLayout>
          {/* <ReactQueryDevtools initialIsOpen={false} position="top-left" /> */}
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default App;
