import type { NextPage } from 'next'
import { Box, Button, Text } from '@chakra-ui/react'
import { useScene } from '@/hooks/useScenes'
import { db } from '@/lib/firebase'
import Header from '@/components/Header'
import SceneForm from '@/components/SceneForm'
import SceneCard from '@/components/SceneCard'

const Home: NextPage = () => {
  const {
    scene, loading, error
  } = useScene(db, 'Qoa5d69uRsK430S1MaG2')
  // console.log('usescene', scene, loading, error)
  return (
    <Box>
      {/* <SceneForm /> */}
      <Header />
      {scene && <SceneCard scene={scene} />}
    </Box>
  )
}

export default Home
