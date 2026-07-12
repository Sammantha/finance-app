'use client'

import Head from 'next/head';
import Menu from './components/menu/menu';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Head>
            <title>Template</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Menu></Menu>
            {children}
          </main>

          <footer></footer>
      </body>
    </html>
  )
}

