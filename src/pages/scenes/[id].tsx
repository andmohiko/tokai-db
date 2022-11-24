import { useEffect, useState } from 'react'

import { Stack, LoadingOverlay } from '@mantine/core'
import { doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useDocument } from 'react-firebase-hooks/firestore'

import { NoPlusLayout } from '~/components/Layouts/NoPlusLayout'
import { SceneDetailCard } from '~/components/SceneDetailCard'
import { Scene, ScenesCollection } from '~/entities'
import { sceneFactory } from '~/hooks/useScenes'
import { db } from '~/lib/firebase'

const SceneDetailPage = () => {
  const router = useRouter()
  const [scene, setScene] = useState<Scene>()
  const sceneId =
    typeof router.query.id === 'string' ? router.query.id : undefined
  console.log('sceneId')

  const [value, loading, error] = useDocument(
    doc(db, ScenesCollection, 'eGpC9bg9LVJyFhJ6hvrO'),
  )

  useEffect(() => {
    if (!value) return
    setScene(sceneFactory(value))
  }, [value])

  if (loading || !scene)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  if (!value || error)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  return (
    <NoPlusLayout>
      <Stack>
        <SceneDetailCard scene={scene} />
      </Stack>
    </NoPlusLayout>
  )
}

export default SceneDetailPage
