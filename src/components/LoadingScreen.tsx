import { Loader, Stack } from '@mantine/core'
import Head from 'next/head'

import { HeadComponent } from '~/components/Head'

export const LoadingScreen = () => (
  <>
    <HeadComponent />
    <Head>
      <meta
        property="og:image"
        content="https://tokai-db.vercel.app/tokaidb.png"
      />
    </Head>
    <Stack
      justify="center"
      align="center"
      style={{
        height: '100vh',
      }}
    >
      <Loader size={60} />
    </Stack>
  </>
)
