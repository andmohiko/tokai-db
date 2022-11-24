import { useState, useEffect } from 'react'

import { LoadingOverlay, Stack } from '@mantine/core'
import { collection, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import { ScenesList } from '~/components/ScenesList'
import { SimpleLayout } from '~/components/SimpleLayout'
import { TagUI } from '~/entities'
import { tagFactory } from '~/hooks/useTags'
import { db } from '~/lib/firebase'
import { isDefined } from '~/utils/type'

const TagsCollection = 'tags'

const IndexPage = () => {
  const [tags, setTags] = useState<TagUI[]>()

  const [value, loading, error] = useCollection(
    query(
      collection(db, TagsCollection),
      orderBy('scenesCount', 'desc')
    )
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

  if (loading || !tags)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  if (!value || error)
    return <LoadingOverlay visible={loading} overlayBlur={2} />

  return (
    <SimpleLayout tags={tags}>
      <Stack
        style={{
          height: '100%'
        }}
      >
        <ScenesList />
      </Stack>
    </SimpleLayout>
  )
}

export default IndexPage
