import { Group, Image, Stack, Text } from '@mantine/core'

import { TagLabel } from '~/components/TagButton'
import { TweetButton } from '~/components/TweetButton'
import { Scene } from '~/entities'

interface Props {
  scene: Scene
}

export const SceneDetailCard = ({ scene }: Props): React.ReactElement => {
  return (
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
      <TweetButton
        shareUrl={`https://tokai-db.vercel.app/scenes/${scene.sceneId}`}
      />
    </Stack>
  )
}
