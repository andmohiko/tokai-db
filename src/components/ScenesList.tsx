import { useState, useEffect } from 'react'

import { LoadingOverlay, SimpleGrid } from '@mantine/core'
import { collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import { SceneCard } from './SceneCard'

import { Scene } from '~/entities'
import { sceneFactory } from '~/hooks/useScenes'
import { db } from '~/lib/firebase'
import { isDefined } from '~/utils/type'

const ScenesCollection = 'scenes'

export const ScenesList = () => {
  const [scenes, setScenes] = useState<Scene[]>()
  const [value, loading, error] = useCollection(
    collection(db, ScenesCollection),
  )

  useEffect(() => {
    if (!value) return
    const scenes = value.docs
      .map((doc) => {
        return sceneFactory(doc)
      })
      .filter(isDefined)
    setScenes(scenes)
  }, [value])

  if (loading || !scenes)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  if (!value || error)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  return (
    <SimpleGrid
      cols={4}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      {scenes.map((s) => (
        <SceneCard key={s.sceneId} scene={s} />
      ))}
    </SimpleGrid>
  )
}
