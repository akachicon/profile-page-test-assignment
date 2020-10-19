import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@/lib/theme';
import { LocalDataProvider } from '@/lib/local-data-context';
import Layout from '@/components/layout';

const hydrationNote =
  'Though it is inconsistency between server and client, ' +
  'the better ux is to show empty data after receiving html ' +
  'and correct data when it is available.';

if (!__IS_SERVER__ && __IS_DEV__) {
  console.log('%c%s', 'color: green', hydrationNote);
}

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <LocalDataProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LocalDataProvider>
      </ThemeProvider>
    </>
  );
}
