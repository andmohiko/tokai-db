import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Scene } from '@/entities'
import { TagLabel } from '@/components/TagButton'

interface Props {
  scene: Scene
}

export const SceneCard = ({ scene }: Props): React.ReactElement => {
  return (
    <Box w="400px" h="300px">
      <Image src={scene.screenshotURL} />
      <Text fontSize="2xl">{scene.title}</Text>
      <Text fontSize="base">いいね: {scene.likes}</Text>
      <Flex>
        {scene.tags.map((tag) => {
          return (
            <Flex key={tag} mr={1}>
              <TagLabel tagLabel={tag} />
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
}
