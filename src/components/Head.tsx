import Head from 'next/head'

export const HeadComponent = () => (
  <Head>
    <title>東海DB</title>
    <meta name="description" content="東海オンエア スクショDB" />
    <link rel="icon" href="/favicon.ico" />

    <meta property="og:url" content="https://tokai-db.vercel.app/" />
    <meta property="og:title" content="東海DB" />
    <meta property="og:description" content="東海オンエア スクショ" />
    <meta property="og:site_name" content="東海DB" />
    {/* <meta
      property="og:image"
      content="https://tokai-db.vercel.app/tokaidb.png"
    /> */}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@andmohiko" />
  </Head>
)
