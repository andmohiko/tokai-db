import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = {
  children?: ReactNode
}

const Layout: React.FC = ({ children }: Props) => (
  <Box minH={'100vh'}>
    <Head>
      <title>東海DB</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    {children}
    <Footer />
  </Box>
)

export default Layout
