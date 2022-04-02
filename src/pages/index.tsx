import type { NextPage } from 'next'
import { Button, Text } from '@chakra-ui/react'
import { useScene } from '@/hooks/useScenes'
import { db } from '@/lib/firebase'
import SceneCard from '@/components/SceneCard'

const Home: NextPage = () => {
  const {
    scene, loading, error
  } = useScene(db, 'Qoa5d69uRsK430S1MaG2')
  console.log('usescene', scene, loading, error)
  return (
    <>
      {scene && <SceneCard scene={scene} />}
    </>
  )
}

export default Home
