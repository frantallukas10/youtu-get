import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import reset from 'styled-reset';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../helpers/theme';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */

  a {
    color: ${({ theme }) => theme.default.color};
    display: inline-block;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  html, body {
    height: 100%;
    > div {
      color: ${({ theme }) => theme.default.color};
      background: ${({ theme }) => theme.default.background};
      height: 100%;
    }
  }
`;

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>youtu-get</title>
        </Head>
        <StyledThemeProvider theme={theme}>
          <MaterialThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <Component {...pageProps} />
          </MaterialThemeProvider>
        </StyledThemeProvider>
      </>
    );
  }
}
