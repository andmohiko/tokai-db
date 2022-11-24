import { AppShell, Header, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { AddSceneSheet } from '~/components/BottomSheets/AddSceneSheet'
import Footer from '~/components/Footer'
import { HeadComponent } from '~/components/Head'
import { TagUI } from '~/entities'

type Props = {
  children: React.ReactNode
  tags: TagUI[]
}

export const NoPlusLayout = ({ children, tags }: Props) => {
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
          position: 'relative',
        },
      })}
    >
      <HeadComponent />

      <Stack
        align="center"
        style={{
          height: '100%',
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        <Stack
          style={{
            maxWidth: 720,
          }}
        >
          {children}
        </Stack>
      </Stack>

      <Footer />

      <AddSceneSheet tags={tags} opened={opened} onClose={handlers.close} />
    </AppShell>
  )
}
