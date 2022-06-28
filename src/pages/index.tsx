import { useState } from 'react'
import type { NextPage } from 'next'
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useFetchScenes } from '@/hooks/useScenes'
import { db } from '@/lib/firebase'
import { SceneForm } from '@/components/SceneForm'
import { SceneCard } from '@/components/SceneCard'
import Layout from '@/components/Layout'
import { useFetchTags } from '@/hooks/useTags'
import { SceneDetailModal } from '@/components/SceneDetailModal'
import { Scene } from '@/entities'

const HomePage: NextPage = () => {
  const fetchTags = useFetchTags(db)
  const fetchScenes = useFetchScenes(db)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentScene, setCurrentScene] = useState<Scene>()
  const selectScene = (scene: Scene) => {
    setCurrentScene(scene)
    onOpen()
  }

  const tags = fetchTags()
  const scenes = fetchScenes()

  return (
    <>
      <Layout>
        <Box>
          {tags && (
            <Box m={2}>
              <SceneForm tagsMaster={tags} />
            </Box>
          )}
          {scenes && (
            <Flex>
              {scenes.map((scene) => (
                <Box
                  mr={2}
                  key={scene.sceneId}
                  onClick={() => selectScene(scene)}
                >
                  <SceneCard scene={scene} />
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      </Layout>

      {currentScene && (
        <SceneDetailModal
          isOpen={isOpen}
          onClose={onClose}
          scene={currentScene}
        />
      )}
    </>
  )
}

export default HomePage
