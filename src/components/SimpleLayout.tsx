import { AppShell, Header, Stack, Title } from '@mantine/core'

import { HeadComponent } from '~/components/Head'

type Props = {
  children: React.ReactNode
}

export const SimpleLayout = ({ children }: Props) => (
  <AppShell
    padding="md"
    header={
      <Header height={60} p="xs">
        <Title order={1}>東海DB</Title>
      </Header>
    }
    styles={(theme) => ({
      main: {
        backgroundColor: theme.colors.gray[0],
      },
    })}
  >
    <HeadComponent />
    <Stack
      justify="center"
      align="center"
      style={{ minHeight: 'calc(100vh - 100px)' }}
    >
      {children}
    </Stack>
  </AppShell>
)
