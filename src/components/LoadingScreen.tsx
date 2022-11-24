import { Loader, Stack } from '@mantine/core'
import Head from 'next/head'

import { NoPlusLayout } from './Layouts/NoPlusLayout'

type Props = {
  screenshotURL?: string
}

export const LoadingScreen = ({
  screenshotURL = 'https://tokai-db.vercel.app/tokaidb.png',
}: Props) => (
  <NoPlusLayout>
    <Head>
      <meta property="og:image" content={screenshotURL} />
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
  </NoPlusLayout>
)
