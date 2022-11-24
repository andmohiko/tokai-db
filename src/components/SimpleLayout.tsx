import { AppShell, Group, Header, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { AddSceneSheet } from '~/components/BottomSheets/AddSceneSheet'
import { HeadComponent } from '~/components/Head'
import { PlusButton } from '~/components/PlusButton'
import { TagUI } from '~/entities'

type Props = {
  children: React.ReactNode
  tags: TagUI[]
}

export const SimpleLayout = ({ children, tags }: Props) => {
  const [opened, handlers] = useDisclosure(false)

  return (
    <>
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
          justify="center"
          align="center"
          style={{ minHeight: 'calc(100vh - 100px)' }}
        >
          {children}
        </Stack>

        <AddSceneSheet tags={tags} opened={opened} onClose={handlers.close} />
      </AppShell>

      <Group
        align="center"
        position="center"
        style={{
          position: 'absolute',
          bottom: 40,
          width: '100%',
        }}
      >
        <PlusButton onClick={handlers.open} />
      </Group>
    </>
  )
}
