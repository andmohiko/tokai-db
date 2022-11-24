import { useState, useEffect } from 'react'

import { Stack } from '@mantine/core'
import { collection, orderBy, query } from 'firebase/firestore'
import Head from 'next/head'
import { useCollection } from 'react-firebase-hooks/firestore'

import { SimpleLayout } from '~/components/Layouts/SimpleLayout'
import { LoadingScreen } from '~/components/LoadingScreen'
import { ScenesList } from '~/components/ScenesList'
import { TagUI, TagsCollection } from '~/entities'
import { tagFactory } from '~/hooks/useTags'
import { db } from '~/lib/firebase'
import { isDefined } from '~/utils/type'

const IndexPage = () => {
  const [tags, setTags] = useState<TagUI[]>()

  const [value, loading, error] = useCollection(
    query(collection(db, TagsCollection), orderBy('scenesCount', 'desc')),
  )

  useEffect(() => {
    if (!value) return
    const scenes = value.docs
      .map((doc) => {
        return tagFactory(doc)
      })
      .filter(isDefined)
    setTags(scenes)
  }, [value])

  if (loading || !tags) return <LoadingScreen />

  if (!value || error) return <LoadingScreen />

  return (
    <SimpleLayout tags={tags}>
      <Head>
        <title>東海DB</title>
        <meta name="description" content="東海オンエア スクショDB" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content="https://tokai-db.vercel.app/" />
        <meta property="og:title" content="東海DB" />
        <meta property="og:description" content="東海オンエア スクショ" />
        <meta property="og:site_name" content="東海DB" />
        <meta
          property="og:image"
          content="https://tokai-db.vercel.app/tokaidb.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@andmohiko" />
      </Head>

      <Stack
        style={{
          height: '100%',
        }}
      >
        <ScenesList />
      </Stack>
    </SimpleLayout>
  )
}

export default IndexPage
