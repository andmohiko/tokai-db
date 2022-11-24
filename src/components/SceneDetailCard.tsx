import {
  Button,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'

import { TagLabel } from '~/components/TagButton'
import { TweetButton } from '~/components/TweetButton'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
  opened: boolean
  onClose: () => void
}

export const SceneDetailCard = ({
  scene,
  opened,
  onClose,
}: Props): React.ReactElement => {
  const theme = useMantineTheme()
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>{scene.title}</Title>}
      centered
      padding="lg"
      overlayColor={theme.colors.gray[1]}
      overlayOpacity={0.2}
      overlayBlur={4}
    >
      <Stack spacing="xl">
        <Image src={scene.screenshotURL} alt={scene.title} />
        <Stack spacing="xs">
          <Stack
            style={{
              gap: 0,
            }}
          >
            <Text
              style={{
                color: '#777',
                fontSize: 11,
              }}
            >
              このシーンの動画
            </Text>
            <Text size="xl">{scene.videoName}</Text>
          </Stack>
          <Group spacing="xs">
            {scene.tags.map((tag) => (
              <TagLabel key={tag} tagLabel={tag} />
            ))}
          </Group>
        </Stack>
        <TweetButton />
      </Stack>
    </Modal>
  )
}
