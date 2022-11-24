import { useEffect, useState } from 'react'

import { Stack, Anchor } from '@mantine/core'
import { doc } from 'firebase/firestore'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDocument } from 'react-firebase-hooks/firestore'

import { NoPlusLayout } from '~/components/Layouts/NoPlusLayout'
import { LoadingScreen } from '~/components/LoadingScreen'
import { SceneDetailCard } from '~/components/SceneDetailCard'
import { Scene, ScenesCollection } from '~/entities'
import { sceneFactory } from '~/hooks/useScenes'
import { db } from '~/lib/firebase'

const SceneDetailPage = () => {
  const router = useRouter()
  const [scene, setScene] = useState<Scene>()
  const sceneId =
    typeof router.query.id === 'string' ? router.query.id : undefined

  const [value, loading, error] = useDocument(
    doc(
      db,
      ScenesCollection,
      router.isReady ? sceneId! : 'aKbruGTCyd5OsJFAv7To',
    ),
  )

  useEffect(() => {
    if (!value || sceneId === 'aKbruGTCyd5OsJFAv7To') {
      return
    }

    setScene(sceneFactory(value))
  }, [value, sceneId])

  if (loading || !scene) return <LoadingScreen />

  if (!value || error) return <LoadingScreen />

  return (
    <NoPlusLayout>
      <Head>
        <meta property="og:image" content={scene.screenshotURL} />
      </Head>
      <Stack
        justify="space-between"
        style={{
          gap: 160,
          textAlign: 'center',
        }}
      >
        <SceneDetailCard scene={scene} />
        <Anchor href="/">一覧へ戻る</Anchor>
      </Stack>
    </NoPlusLayout>
  )
}

export default SceneDetailPage
