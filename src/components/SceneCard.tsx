import { Box, Button, Image, Text } from '@chakra-ui/react'
import { Scene } from '@/entities'

interface Props {
  scene: Scene
}

const SceneCard = ({ scene }: Props): React.ReactElement => {
  return (
    <Box w="400px" h="300px">
      <Image src={scene.screenshotURL} />
      <Text fontSize='2xl'>{scene.title}</Text>
      <Text fontSize='base'>いいね: {scene.likes}</Text>
      <Text fontSize='lg'>タグ {scene.tags.map(tag => <Text>{tag}</Text>)}</Text>
    </Box>
  )
}

export default SceneCard
