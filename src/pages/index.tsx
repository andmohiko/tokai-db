import type { NextPage } from 'next'
import { Box, Button, Text } from '@chakra-ui/react'
import { useScene } from '@/hooks/useScenes'
import { db } from '@/lib/firebase'
import { SceneForm } from '@/components/SceneForm'
import { SceneCard } from '@/components/SceneCard'
import Layout from '@/components/Layout'
import { useFetchTags } from '@/hooks/useTags'

const HomePage: NextPage = () => {
  const fetchTags = useFetchTags(db)
  const tags = fetchTags()
  const { scene, loading, error } = useScene(db, 'Qoa5d69uRsK430S1MaG2')
  // console.log('usescene', scene, loading, error)
  return (
    <Layout>
      <Box>
        {tags && (
          <Box m={2}>
            <SceneForm tagsMaster={tags} />
          </Box>
        )}
        {scene && <SceneCard scene={scene} />}
      </Box>
    </Layout>
  )
}

export default HomePage
