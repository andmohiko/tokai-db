import { useEffect, useState } from 'react'

import { Stack, Anchor } from '@mantine/core'
import { doc } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDocument } from 'react-firebase-hooks/firestore'

import { NoPlusLayout } from '~/components/Layouts/NoPlusLayout'
import { LoadingScreen } from '~/components/LoadingScreen'
import { SceneDetailCard } from '~/components/SceneDetailCard'
import { Scene, ScenesCollection } from '~/entities'
import { sceneFactory } from '~/hooks/useScenes'
import { db } from '~/lib/firebase'

type Props = {
  scene: Scene
}

const SceneDetailPage = ({ scene }: Props) => {
  console.log('scene', scene)
  // const router = useRouter()
  // const [scene, setScene] = useState<Scene>()
  // const sceneId =
  //   typeof router.query.id === 'string' ? router.query.id : undefined

  // const [value, loading, error] = useDocument(
  //   doc(
  //     db,
  //     ScenesCollection,
  //     router.isReady ? sceneId! : 'aKbruGTCyd5OsJFAv7To',
  //   ),
  // )

  // useEffect(() => {
  //   if (!value || sceneId === 'aKbruGTCyd5OsJFAv7To') {
  //     return
  //   }

  //   setScene(sceneFactory(value))
  // }, [value, sceneId])

  const OgpHead = () => (
    <Head>
      <meta
        property="og:url"
        content={`https://tokai-db.vercel.app/scenes/${scene.sceneId}`}
      />
      <meta property="og:title" content={`東海DB | ${scene.title}`} />
      <meta property="og:description" content={scene.videoName} />
      <meta property="og:site_name" content="東海DB" />
      <meta property="og:image" content={scene.screenshotURL} />
    </Head>
  )

  // if (loading || !scene) return <LoadingScreen screenshotURL={screenshotURL} />

  // if (!value || error) return <LoadingScreen screenshotURL={screenshotURL} />

  return (
    <NoPlusLayout>
      <OgpHead />

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/scenes/${id}`)
  const ogpData = await res.json()
  return { props: { scene: ogpData.data } }
}

export default SceneDetailPage
