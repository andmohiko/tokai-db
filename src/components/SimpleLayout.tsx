import { AppShell, Header, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { AddSceneSheet } from '~/components/BottomSheets/AddSceneSheet'
import { HeadComponent } from '~/components/Head'
import { PlusButton } from '~/components/PlusButton'

type Props = {
  children: React.ReactNode
}

export const SimpleLayout = ({ children }: Props) => {
  const [opened, handlers] = useDisclosure(false)

  return (
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
      <PlusButton onClick={handlers.open} />
      <Stack
        justify="center"
        align="center"
        style={{ minHeight: 'calc(100vh - 100px)' }}
      >
        {children}
      </Stack>

      <AddSceneSheet opened={opened} onClose={handlers.close} />
    </AppShell>
  )
}
