import { Box, Group, Image, Stack, Text } from '@mantine/core'

import { TagLabel } from '~/components/TagButton'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
}

export const SceneCard = ({ scene }: Props): React.ReactElement => (
  <Stack>
    <Image src={scene.screenshotURL} alt={scene.title} />
    <Text size="lg">{scene.title}</Text>
    <Group spacing="xs">
      {scene.tags.map((tag) => (
        <TagLabel key={tag} tagLabel={tag} />
      ))}
    </Group>
  </Stack>
)
